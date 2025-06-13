import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSideBar";
import Welcome from "./dashboard/_components/Welcome";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className="w-full">
         <SidebarTrigger />
          <Welcome/>
        {children}
        </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
