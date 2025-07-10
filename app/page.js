'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Brain, Shield, BarChart3, Star, ArrowRight, Play, Users, Award, Zap } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Sarah Chen", role: "Software Engineer", text: "VoiceKit helped me land my dream job! The AI questions were spot-on.", rating: 5 },
    { name: "Marcus Johnson", role: "Product Manager", text: "The voice interaction feels so natural. Best interview prep tool I've used.", rating: 5 },
    { name: "Priya Patel", role: "Data Scientist", text: "My confidence skyrocketed after practicing with VoiceKit. Highly recommend!", rating: 5 }
  ];

  const stats = [
    { number: "10K+", label: "Interviews Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Companies" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative w-full py-6 flex justify-between items-center max-w-6xl mx-auto px-6 backdrop-blur-sm bg-white/80 rounded-2xl mt-4 shadow-sm border border-white/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image src="/logo.jpeg" alt="VoiceKit Logo" width={45} height={45} className="rounded-xl shadow-md" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">VoiceKit AI</span>
        </div>
        <Link href="/auth">
          <Button variant="outline" className="hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-300 border-2 hover:border-transparent">
            Login
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className={`relative flex flex-col items-center justify-center text-center mt-16 max-w-5xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-20 animate-pulse"></div>
          <div className="relative text-6xl animate-bounce">🎙️</div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 leading-tight mb-6">
          Ace Your Interview
          <br />
          <span className="text-4xl md:text-6xl">with Voice AI</span>
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
          A voice-interactive mock interview platform powered by AI. Get dynamic questions,
          practice in real time, and level up your interview skills.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <Link href="/auth">
            <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="ghost" className="text-lg font-semibold text-gray-700 hover:text-indigo-600 transition-all duration-300 group">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-2xl">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600">{stat.number}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Premium Image */}
        <div className="mt-16 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
            <Image 
              src="/images.jpg" 
              alt="AI Interview Demo" 
              width={900} 
              height={500} 
              className="rounded-2xl" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="mt-32 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ✨ Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to master your interview skills and land your dream job
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Mic className="h-8 w-8 text-indigo-600" />,
              title: "Voice Interview Simulation",
              description: "Real-time voice-based interaction to simulate real interview conditions with natural conversation flow."
            },
            {
              icon: <Shield className="h-8 w-8 text-green-600" />,
              title: "Supabase Authentication", 
              description: "Secure login and user tracking using enterprise-grade Supabase Auth with complete privacy protection."
            },
            {
              icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
              title: "Smart Dashboard",
              description: "Track progress and get detailed insights into your mock sessions with performance analytics."
            },
            {
              icon: <Brain className="h-8 w-8 text-pink-600" />,
              title: "AI Question Generator",
              description: "Smart, personalized interview questions tailored to your goals and industry requirements."
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl w-fit group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-32 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
        </div>
        
        <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {testimonials[currentTestimonial].name[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-32 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who've already improved their interview performance
            </p>
            <Link href="/auth">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Zap className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 text-center py-12 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.jpeg" alt="VoiceKit Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold text-gray-800">VoiceKit AI</span>
          </div>
          <p className="text-gray-600 mb-2">
            © 2025 VoiceKit AI. Built with Next.js, Supabase
          </p>
          <p className="text-sm text-gray-500">
            Made with ❤️ by <span className="text-indigo-600 font-semibold">Divyam Aggarwal</span>
          </p>
        </div>
      </footer>
    </div>
  );
}