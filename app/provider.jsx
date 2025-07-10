'use client'

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;

      try {
        let { data: Users, error } = await supabase
          .from('Users')
          .select('*')
          .eq('email', user.email);

        if (error) {
          console.error('Error fetching user:', error);
          return;
        }

        if (!Users || Users.length === 0) {
          const { data: insertedData, error: insertError } = await supabase
            .from('Users')
            .insert([
              {
                name: user?.user_metadata?.name,
                email: user?.email,
                profile_photo: user?.user_metadata?.avatar_url,
              },
            ])
            .select();

          if (insertError) {
            console.error('Error inserting user:', insertError);
            return;
          }

          if (insertedData && insertedData.length > 0) {
            setUser(insertedData[0]);
          }
        } else {
          setUser(Users[0]);
        }

        // Redirect if coming from /auth
        if (pathname === '/auth') router.push('/dashboard');
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    });
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
