"use client";
import { useUser } from "@/app/provider";
import React from "react";
import { Bell } from "lucide-react";
import Image from "next/image";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Welcome() {
  const { user } = useUser();
  // Example: you can fetch notification count from context or props
  const notificationCount = 2; // Replace with real data

  return (
    <div className="relative bg-white/60 backdrop-blur-md border border-white/70 shadow-xl rounded-2xl flex items-center justify-between px-6 py-4 mt-4 mx-4 ring-1 ring-indigo-100 transition-all">
      <div>
        <h2 className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          {getGreeting()}, {user?.name ?? "User"}!
        </h2>
        <h3 className="text-gray-500 text-base mt-1">AI Based Interview</h3>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative group">
          <Bell className="w-6 h-6 text-indigo-500 group-hover:text-purple-600 transition-colors duration-200 cursor-pointer" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </div>
        {user && (
          <div className="relative group">
            <Image
              src={user.profile_photo}
              alt="Profile"
              width={44}
              height={44}
              className="rounded-full shadow-lg border-2 border-indigo-100 group-hover:ring-2 group-hover:ring-purple-400 transition-all"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
        )}
      </div>
      {/* Animated border */}
      <style jsx>{`
        .ring-1 {
          box-shadow: 0 2px 16px 0 rgba(99, 102, 241, 0.07);
        }
      `}</style>
    </div>
  );
}

export default Welcome;
