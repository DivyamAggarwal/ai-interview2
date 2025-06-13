"use client"
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
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function AppSidebar() {
  const path=usePathname();
  console.log(path);
  return (
    <Sidebar>
      <SidebarHeader className={"flex items-center mt-5"}>
        <Image
          src={"/logo.jpeg"}
          alt="logo"
          width={110}
          height={110}
          className="rounded-2xl w-[220px] h-[100px]"
        />
        <Button className={"w-full mt-3"}>
          <Plus />
          Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className={'p-1'}>
                  <SidebarMenuButton asChild className={`p-2 ${path==option.path &&'bg-purple-100'}`}>
                    <Link href={option.path}>
                        <option.icon className={`${path==option.path && 'text-primary'}`}/>
                        <span className={`font-medium ${path==option.path && 'text-primary'}`}>{option.name}</span>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
