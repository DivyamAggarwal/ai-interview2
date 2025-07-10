"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

function Login() {
  const [particleStyles, setParticleStyles] = useState([]);

  useEffect(() => {
    // Generate random positions and animation for 10 particles
    const styles = Array.from({ length: 10 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${36 + Math.random() * 36}px`,
      height: `${36 + Math.random() * 36}px`,
      filter: `blur(${3 + Math.random() * 7}px)`,
      opacity: 0.13 + Math.random() * 0.13,
      animationDelay: `${i * 0.9}s`,
      animationDuration: `${8 + Math.random() * 5}s`,
    }));
    setParticleStyles(styles);
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_HOST_URL}/auth`,
      },
    });
    if (error) {
      // Optionally handle error feedback
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f5f3ff] to-[#c7d2fe] overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/60 via-indigo-100/50 to-pink-100/60 animate-bgShift z-0"></div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 animate-floatPulse"
            style={style}
          />
        ))}
      </div>

      {/* Blurred background shapes for extra depth */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-gradient-to-br from-purple-300 via-indigo-200 to-transparent rounded-full opacity-40 blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-200 via-pink-100 to-transparent rounded-full opacity-35 blur-2xl z-0"></div>

      {/* Glassmorphism login card */}
      <div className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/80 p-10 flex flex-col items-center ring-2 ring-indigo-300/30 hover:ring-4 hover:ring-purple-400/40 transition-all duration-300 group">
        <Image
          src="/logo.jpeg"
          alt="Ai Recruiter Logo"
          width={80}
          height={80}
          className="rounded-2xl shadow mb-4 group-hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center tracking-tight drop-shadow">
          Welcome to Ai Recruiter
        </h2>
        <p className="text-gray-500 text-center mb-4">
          The premium AI-powered interview platform
        </p>
        <span className="inline-block px-4 py-1 mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-600 text-xs font-semibold tracking-wide shadow-sm">
          Secure • Fast • Trusted
        </span>
        <Image
          src="/login.webp"
          alt="Login Illustration"
          width={320}
          height={200}
          className="rounded-xl mb-6 shadow-lg"
        />
        <Button
          className="w-full flex items-center justify-center gap-2 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          onClick={signInWithGoogle}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <g>
              <path
                d="M44.5 20H24v8.5h11.7C34.9 32.7 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.2-7.6 19.2-19.2 0-1.3-.1-2.3-.3-3.3z"
                fill="#FFC107"
              />
              <path
                d="M6.3 14.7l7 5.1C15.7 16.2 19.5 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 16.3 3 9.4 7.7 6.3 14.7z"
                fill="#FF3D00"
              />
              <path
                d="M24 45c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3c-2.1 1.5-4.8 2.5-7.6 2.5-6.2 0-11.4-4.2-13.2-9.9l-7 5.4C9.4 40.3 16.3 45 24 45z"
                fill="#4CAF50"
              />
              <path
                d="M44.5 20H24v8.5h11.7c-1.2 3.1-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.8-1.9l-7 5.4C17.6 42.8 20.6 45 24 45c10.5 0 19.2-7.6 19.2-19.2 0-1.3-.1-2.3-.3-3.3z"
                fill="#1976D2"
              />
            </g>
          </svg>
          Continue with Google
        </Button>
        <div className="mt-6 text-xs text-gray-400 text-center">
          <span>By signing in, you agree to our</span>{" "}
          <a
            href="#"
            className="underline text-indigo-500 hover:text-purple-600 transition-colors"
            tabIndex={0}
          >
            Terms of Service
          </a>
          {" "}and{" "}
          <a
            href="#"
            className="underline text-indigo-500 hover:text-purple-600 transition-colors"
            tabIndex={0}
          >
            Privacy Policy
          </a>
          .
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#34D399"/><path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Google Secure Auth
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#60A5FA"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Privacy First
          </span>
        </div>
      </div>

      {/* Custom CSS for background and animation */}
      <style jsx>{`
        @keyframes floatPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-40px) scale(1.08);
            opacity: 0.75;
          }
        }
        .animate-floatPulse {
          animation: floatPulse infinite alternate;
        }
        @keyframes bgShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-bgShift {
          background-size: 200% 200%;
          animation: bgShift 16s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
