"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar className="relative w-72 min-h-screen flex flex-col bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl overflow-hidden transition-all duration-300 group">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900/20 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] animate-float" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] animate-float-reverse" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-transparent rounded-full blur-xl animate-float opacity-60" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tr from-purple-400/15 via-pink-400/15 to-transparent rounded-full blur-xl animate-float-reverse opacity-40" />

      <SidebarHeader className="flex flex-col items-center pt-8 px-6 pb-4">
        <div className="relative group/logo">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover/logo:opacity-50 transition-opacity duration-300" />
          <Image
            src={"/logo.jpeg"}
            alt="VoiceKit AI Logo"
            width={220}
            height={100}
            className="relative rounded-2xl shadow-2xl mb-4 w-[220px] h-[100px] border-2 border-slate-700/50 group-hover/logo:scale-105 transition-transform duration-300 object-cover"
          />
        </div>
        
        <Button className="w-full mt-4 flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-4 text-base font-semibold text-white border-0 group/button relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700 ease-out" />
          <Plus className="w-5 h-5 z-10 flex-shrink-0" />
          <span className="z-10">Create New Interview</span>
          <Sparkles className="w-4 h-4 z-10 opacity-70 flex-shrink-0" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="flex-1 mt-6 px-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {SideBarOptions.map((option, index) => {
              const isActive = path === option.path;
              return (
                <SidebarMenuItem
                  key={index}
                  className="group/item transition-all duration-300"
                >
                  <SidebarMenuButton asChild className="p-0">
                    <Link
                      href={option.path}
                      className={`flex items-center gap-4 px-4 py-3 w-full rounded-xl transition-all duration-300 relative overflow-hidden mx-1 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                      tabIndex={0}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Icon container with enhanced styling */}
                      <div className={`relative z-10 flex-shrink-0 ${isActive ? "drop-shadow-sm" : ""}`}>
                        <option.icon
                          className={`w-5 h-5 transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover/item:text-indigo-400"
                          }`}
                        />
                      </div>
                      
                      {/* Text with improved typography */}
                      <span
                        className={`font-semibold text-base transition-all duration-300 z-10 ${
                          isActive
                            ? "text-white"
                            : "text-slate-300 group-hover/item:text-white"
                        }`}
                      >
                        {option.name}
                      </span>

                      {/* Subtle hover effect */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        
        {/* Enhanced divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="w-2 h-2 bg-slate-600 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
      </SidebarContent>

      <SidebarFooter className="flex flex-col items-center py-6 px-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-slate-400 font-medium">
            VoiceKit AI v1.0
          </span>
        </div>
      </SidebarFooter>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(10px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(10px) translateX(-5px); }
          50% { transform: translateY(5px) translateX(5px); }
          75% { transform: translateY(15px) translateX(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        /* Smooth scrollbar */
        .sidebar-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-content::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.1);
          border-radius: 3px;
        }
        
        .sidebar-content::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 3px;
        }
        
        .sidebar-content::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.8);
        }
      `}</style>
    </Sidebar>
  );
}