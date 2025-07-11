"use client";
import { useUser } from "@/app/provider";
import React, { useState, useEffect } from "react";
import { Bell, Settings, ChevronDown, Sparkles, Calendar, Clock, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getGreetingIcon() {
  const hour = new Date().getHours();
  if (hour < 12) return "🌅";
  if (hour < 18) return "☀️";
  return "🌙";
}

function Welcome() {
  const { user, signOut } = useUser(); // Added signOut from context
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();
  const notificationCount = 2;

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  // Sign out handler
  const handleSignOut = async () => {
    setIsSigningOut(true);
    setShowDropdown(false);
    
    try {
      // Call your sign out function from context/provider
      if (signOut) {
        await signOut();
      }
      
      // Clear any local storage or session data if needed
      localStorage.removeItem('user');
      sessionStorage.clear();
      
      // Redirect to authentication page
      router.push('/auth'); // Adjust path as needed
    } catch (error) {
      console.error('Sign out error:', error);
      // Still redirect even if there's an error
      router.push('/auth');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="relative group w-full z-50">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main Header Container */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 mt-4 mx-4 transition-all duration-300 hover:shadow-3xl hover:scale-[1.01] z-50">
        
        {/* Left Section - Greeting */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <div className="text-2xl sm:text-3xl animate-bounce flex-shrink-0">{getGreetingIcon()}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                {getGreeting()}, {user?.name ?? "User"}!
              </h2>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-pulse flex-shrink-0" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-gray-600 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="font-medium truncate">{currentDate}</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden sm:inline">AI Based Interview</span>
                <span className="sm:hidden">AI Interview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          
          {/* Notifications */}
          <div className="relative group/notification">
            <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer group-hover/notification:scale-110">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover/notification:text-purple-600 transition-colors duration-200" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </div>
          </div>

          {/* Settings - Hidden on mobile */}
          <div className="hidden sm:block p-3 bg-gradient-to-r from-gray-50 to-slate-50 hover:from-gray-100 hover:to-slate-100 rounded-2xl transition-all duration-300 cursor-pointer hover:scale-110">
            <Settings className="w-6 h-6 text-gray-600 hover:text-gray-800 transition-colors duration-200 hover:rotate-90" />
          </div>

          {/* Profile Dropdown */}
          {user && (
            <div className="relative profile-dropdown z-[100]">
              <div 
                className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="relative flex-shrink-0">
                  <Image
                    src={user.profile_photo || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-lg border-2 sm:border-3 border-white ring-2 ring-blue-200 transition-all duration-300 hover:ring-purple-300 object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white rounded-full animate-pulse" />
                </div>
                <div className="hidden md:block min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="fixed right-4 top-20 w-56 bg-white/98 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl py-3 z-[200] animate-slideIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    View Profile
                  </button>
                  
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Account Settings
                  </button>
                  
                  {/* Sign Out Button with Enhanced Styling */}
                  <button 
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-t border-gray-100 mt-1"
                  >
                    {isSigningOut ? (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-spin"></div>
                        Signing out...
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-4 left-8 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-20" />
          <div className="absolute top-8 right-12 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30" />
          <div className="absolute bottom-6 left-16 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-25" />
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .truncate {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

export default Welcome;
