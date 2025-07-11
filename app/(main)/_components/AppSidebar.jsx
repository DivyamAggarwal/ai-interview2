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
import { Plus, Sparkles, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function AppSidebar() {
  const path = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Toggle Button - Fixed position when sidebar is collapsed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-[60] p-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <Sidebar 
        className={`fixed left-0 top-0 w-60 h-full flex flex-col bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl overflow-hidden transition-all duration-300 group z-[50] ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900/20 animate-pulse-slow" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] animate-float" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] animate-float-reverse" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute -top-20 -left-20 w-32 h-32 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-transparent rounded-full blur-xl animate-float opacity-60" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-tr from-purple-400/15 via-pink-400/15 to-transparent rounded-full blur-xl animate-float-reverse opacity-40" />

        <SidebarHeader className="flex flex-col items-center pt-6 px-4 pb-3 flex-shrink-0">
          <div className="relative group/logo">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-25 group-hover/logo:opacity-50 transition-opacity duration-300" />
            <Image
              src={"/logo.jpeg"}
              alt="VoiceKit AI Logo"
              width={180}
              height={80}
              className="relative rounded-xl shadow-xl mb-3 w-[180px] h-[80px] border-2 border-slate-700/50 group-hover/logo:scale-105 transition-transform duration-300 object-cover"
            />
          </div>
          
          <Button className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg py-3 text-sm font-semibold text-white border-0 group/button relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-700 ease-out" />
            <Plus className="w-4 h-4 z-10 flex-shrink-0" />
            <span className="z-10">Create Interview</span>
            <Sparkles className="w-3 h-3 z-10 opacity-70 flex-shrink-0" />
          </Button>
        </SidebarHeader>

        <SidebarContent className="flex-1 mt-4 px-3 overflow-y-auto min-h-0">
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
                        className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-all duration-300 relative overflow-hidden mx-1 ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                        }`}
                        tabIndex={0}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className={`relative z-10 flex-shrink-0 ${isActive ? "drop-shadow-sm" : ""}`}>
                          <option.icon
                            className={`w-4 h-4 transition-all duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-slate-400 group-hover/item:text-indigo-400"
                            }`}
                          />
                        </div>
                        
                        <span
                          className={`font-medium text-sm transition-all duration-300 z-10 ${
                            isActive
                              ? "text-white"
                              : "text-slate-300 group-hover/item:text-white"
                          }`}
                        >
                          {option.name}
                        </span>

                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-lg" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
          
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
        </SidebarContent>

        <SidebarFooter className="flex flex-col items-center py-4 px-3 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">
              VoiceKit AI v1.0
            </span>
          </div>
        </SidebarFooter>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-8px) translateX(4px); }
            50% { transform: translateY(-4px) translateX(-4px); }
            75% { transform: translateY(-12px) translateX(8px); }
          }
          
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(8px) translateX(-4px); }
            50% { transform: translateY(4px) translateX(4px); }
            75% { transform: translateY(12px) translateX(-8px); }
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
        `}</style>
      </Sidebar>

      {/* Overlay when sidebar is open */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
