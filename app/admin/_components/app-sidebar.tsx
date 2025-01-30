import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import Link from "next/link"
import { auth } from "@/auth"
import { SignOutButton } from "@/components/sign-button"
import { dashboardNavApi, ManagerNavApi } from "./dashboard-nav-api"

export async function AppSidebar() {
  const session = await auth()

  const role = session?.user?.role;

  let nav = ManagerNavApi

  if (role === "ADMIN") {
    nav = dashboardNavApi
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-blue-100">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-lighterBackground">
                    <Link href={item.url}>
                      <item.icon className="text-blue-400" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2 items-center">
          <SignOutButton />
          <p className="text-xs font-bold text-center text-blue-400">
            {session?.user?.email}
          </p>
        </div>
        <SidebarRail />
      </SidebarFooter>
    </Sidebar>
  )
}
