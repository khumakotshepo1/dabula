import Link from "next/link";
import { GaugeIcon, HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export async function DashboardHeader() {

  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1 text-auroraGreen-700 dark:text-auroraGreen-300" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <CustomBreadcrumb />
        <div className="flex items-center gap-2">

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-2">
                <GaugeIcon className="h-6 w-6 text-auroraGreen-700 dark:text-auroraGreen-300" />
                <span className="text-xs font-bold">
                  {user?.email}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                active
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Link href={"/dashboard"}>
            <HomeIcon className="h-6 w-6 text-auroraGreen-700 dark:text-auroraGreen-300 self-end" />
          </Link>

        </div>
      </header>

    </>
  )
}
