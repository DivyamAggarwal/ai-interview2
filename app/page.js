'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50 px-6">
      {/* Header */}
      <header className="w-full py-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="VoiceKit Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-gray-800">VoiceKit AI</span>
        </div>
        <Link href="/auth">
          <Button variant="outline">Login</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center mt-16 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          🎙️ Ace Your Interview with Voice AI
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          A voice-interactive mock interview platform powered by AI. Get dynamic questions,
          practice in real time, and level up your interview skills.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/auth">
            <Button className="px-6 py-3 text-lg">Get Started</Button>
          </Link>
          <Link href="#features">
            <Button variant="ghost" className="text-lg">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Premium Image */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1280&q=80"
            alt="AI Interview Demo"
            width={800}
            height={400}
          />
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="mt-24 max-w-5xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">✨ Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left text-gray-600 px-4 md:px-0">
          <div>
            <h3 className="font-semibold text-lg">🎤 Voice Interview Simulation</h3>
            <p>Real-time voice-based interaction to simulate real interview conditions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">🔐 Supabase Authentication</h3>
            <p>Secure login and user tracking using Supabase Auth.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">📊 Dashboard</h3>
            <p>Track progress and get insights into your mock sessions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">🧠 AI Question Generator</h3>
            <p>Smart, personalized interview questions tailored to your goals.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-sm text-gray-400 text-center py-8">
        © 2025 VoiceKit AI. Built with Next.js, Supabase, and ❤️ <br />
        Made by <span className="text-blue-600 font-medium">Divyam Aggarwal</span>
      </footer>
    </div>
  );
}
