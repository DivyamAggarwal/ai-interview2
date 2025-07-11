'use client'

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    initializeAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in:', session.user.email);
          await handleUserSession(session.user);
        } else if (event === 'SIGNED_OUT' || !session) {
          console.log('User signed out or no session');
          handleSignOut();
        }
        
        setAuthChecked(true);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Updated route protection logic - ONLY protect specific routes
  useEffect(() => {
    if (authChecked && !loading) {
      // Define ONLY the routes that require authentication
      const protectedRoutes = ['/dashboard', '/interview', '/create-interview'];
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
      );
      
      // Only redirect if accessing a protected route without authentication
      if (isProtectedRoute && !isAuthenticated) {
        console.log('Redirecting to auth - accessing protected route without authentication');
        router.push(`/auth?redirectTo=${encodeURIComponent(pathname)}`);
      }
      
      // If authenticated user is on auth page, redirect to dashboard
      if (pathname === '/auth' && isAuthenticated) {
        console.log('Redirecting to dashboard - already authenticated');
        router.push('/dashboard');
      }
    }
  }, [authChecked, loading, isAuthenticated, pathname, router]);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      console.log('Initializing authentication...');
      
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      if (session?.user) {
        console.log('Found existing session for:', session.user.email);
        await handleUserSession(session.user);
      } else {
        console.log('No existing session found');
        setLoading(false);
        setAuthChecked(true);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const handleUserSession = async (authUser) => {
    try {
      console.log('Handling user session for:', authUser.email);
      
      // Check if user exists in database
      let { data: Users, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', authUser.email);

      if (error) {
        console.error('Error fetching user from database:', error);
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      let userData;

      if (!Users || Users.length === 0) {
        console.log('Creating new user in database');
        
        // Create new user in database
        const { data: insertedData, error: insertError } = await supabase
          .from('Users')
          .insert([
            {
              name: authUser?.user_metadata?.name || authUser?.email?.split('@')[0],
              email: authUser?.email,
              profile_photo: authUser?.user_metadata?.avatar_url || '/default-avatar.png',
            },
          ])
          .select();

        if (insertError) {
          console.error('Error inserting user into database:', insertError);
          setLoading(false);
          setAuthChecked(true);
          return;
        }

        userData = insertedData?.[0];
        console.log('New user created:', userData);
      } else {
        userData = Users[0];
        console.log('Existing user found:', userData);
      }

      // Set user state
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);
      setAuthChecked(true);

      console.log('User session handled successfully');

    } catch (err) {
      console.error('Unexpected error handling user session:', err);
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const handleSignOut = () => {
    console.log('Handling sign out');
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
    setAuthChecked(true);
    
    // Clear any cached data
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Only redirect to auth if user is on a protected route
    const protectedRoutes = ['/dashboard', '/interview', '/create-interview'];
    const isOnProtectedRoute = protectedRoutes.some(route => 
      pathname.startsWith(route)
    );
    
    if (isOnProtectedRoute) {
      router.push('/auth');
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('Signing out user');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      }
      
      // handleSignOut will be called by the auth state change listener
    } catch (error) {
      console.error('Sign out error:', error);
      // Force local sign out even if Supabase call fails
      handleSignOut();
    }
  };

  const contextValue = {
    user,
    setUser,
    loading,
    isAuthenticated,
    signOut,
  };

  return (
    <UserDetailContext.Provider value={contextValue}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }
  return context;
};
