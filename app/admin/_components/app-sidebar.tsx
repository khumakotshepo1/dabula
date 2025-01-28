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

  if (!session) {
    return null
  }

  const role = session?.user?.role;

  let nav = ManagerNavApi

  console.log({ role })
  console.log({ nav })

  if (role === "ADMIN") {
    nav = dashboardNavApi
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-lighterBackground">
                    <Link href={item.url}>
                      <item.icon className="text-auroraGreen-700 dark:text-auroraGreen-300" />
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
        <SignOutButton />
        <SidebarRail />
      </SidebarFooter>
    </Sidebar>
  )
}
