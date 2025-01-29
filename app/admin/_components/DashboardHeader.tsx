import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CustomBreadcrumb } from "@/components/custom-breadcrumb";

export function DashboardHeader() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1 text-auroraGreen-700 dark:text-auroraGreen-300" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <CustomBreadcrumb />
        <Link href={"/dashboard"}>
          <HomeIcon className="h-6 w-6 text-auroraGreen-700 dark:text-auroraGreen-300 self-end" />
        </Link>
      </header>

    </>
  )
}
