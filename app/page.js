"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Brain,
  Shield,
  BarChart3,
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
  Zap,
  ChevronDown,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      text: "VoiceKit helped me land my dream job! The AI questions were spot-on and felt incredibly realistic.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      company: "Meta",
      text: "The voice interaction feels so natural. Best interview prep tool I've used in my career.",
      rating: 5,
      avatar: "MJ",
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      company: "Netflix",
      text: "My confidence skyrocketed after practicing with VoiceKit. The feedback was invaluable!",
      rating: 5,
      avatar: "PP",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Interviews Completed",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <Target className="h-5 w-5" />,
    },
    { number: "500+", label: "Companies", icon: <Award className="h-5 w-5" /> },
    {
      number: "24/7",
      label: "AI Support",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  const features = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Voice Interview Simulation",
      description:
        "Experience realistic voice-based interviews with natural conversation flow and instant feedback.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Authentication",
      description:
        "Enterprise-grade security with Supabase Auth ensuring your data stays private and protected.",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Smart Analytics",
      description:
        "Track your progress with detailed performance insights and personalized improvement recommendations.",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Question Generator",
      description:
        "Dynamic, personalized questions tailored to your industry, role, and experience level.",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Dynamic Cursor Effect */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-indigo-50/30 to-purple-50/30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Header */}
      <header className="relative w-full py-4 flex justify-between items-center max-w-7xl mx-auto px-6 backdrop-blur-md bg-white/70 rounded-2xl mt-6 shadow-xl border border-white/60">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Image
              src="/logo.jpeg"
              alt="VoiceKit Logo"
              width={50}
              height={50}
              className="relative rounded-xl shadow-lg"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-md">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              VoiceKit AI
            </span>
            <div className="text-xs text-gray-500 font-medium">
              Next-Gen Interview Prep
            </div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            Reviews
          </Link>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Sparkles className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </Link>
        </nav>
        <Link href="/auth" className="md:hidden">
          <Button
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            Login
          </Button>
        </Link>
      </header>

      {/* Enhanced Hero Section */}
      <main
        className={`relative flex flex-col items-center justify-center text-center mt-20 max-w-6xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative mb-8 group">
          <div className="absolute -inset-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse"></div>
          <div className="relative text-7xl animate-bounce">🎙️</div>
          <div className="absolute -top-4 -right-4 text-2xl animate-spin">
            ✨
          </div>
        </div>

        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 leading-tight mb-6">
            Ace Your Interview
            <br />
            <span className="text-5xl md:text-7xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
              with Voice AI
            </span>
          </h1>
          <div className="absolute -top-4 -left-4 text-indigo-500 opacity-50 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed">
          Transform your interview skills with our AI-powered voice simulation
          platform. Get personalized feedback, practice with realistic
          scenarios, and boost your confidence.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link href="/auth">
            <Button className="px-10 py-5 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <Play className="mr-2 h-5 w-5" />
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="px-10 py-5 text-lg font-semibold border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 group"
            >
              <TrendingUp className="mr-2 h-5 w-5 group-hover:text-indigo-600" />
              See Features
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <div className="flex justify-center mb-2 text-indigo-600">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Demo Image */}
        <div className="mt-20 relative group">
          <div className="absolute -inset-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/images.jpg"
              alt="AI Interview Demo"
              width={1000}
              height={600}
              className="rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-2xl font-bold mb-2">
                Live Interview Simulation
              </div>
              <div className="text-white/80">
                Experience realistic practice sessions
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Features Section */}
      <section id="features" className="mt-40 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-600 font-medium text-sm">
              POWERFUL FEATURES
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you prepare for
            any interview scenario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity`}
              ></div>
              <div
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.bgColor} border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="mt-40 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-6">
            <Star className="h-4 w-4 text-yellow-600 fill-current" />
            <span className="text-yellow-600 font-medium text-sm">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Loved by Professionals
            <br />
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/60">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400 fill-current mx-1"
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-indigo-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="mt-40 max-w-5xl mx-auto px-6 text-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-16 shadow-2xl text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 animate-pulse delay-1000"></div>

            <div className="relative z-10">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your
                <br />
                Interview Success?
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of professionals who've already improved their
                interview performance and landed their dream jobs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-10 py-5 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-10 py-5 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="mt-40 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Image
                  src="/logo.jpeg"
                  alt="VoiceKit Logo"
                  width={40}
                  height={40}
                  className="rounded-xl"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold">VoiceKit AI</span>
            </div>
            <p className="text-gray-300 mb-4 text-lg">
              Empowering professionals with AI-powered interview preparation
            </p>
            <p className="text-gray-400 mb-2">
              © 2025 VoiceKit AI. Built with Next.js, Supabase & AI Magic
            </p>
            <p className="text-sm text-gray-500">
              Made with ❤️ by{" "}
              <span className="text-indigo-400 font-semibold">
                Divyam Aggarwal
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
