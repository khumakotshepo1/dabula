import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { AppSidebar } from "./_components/app-sidebar";
import { DashboardHeader } from "./_components/DashboardHeader";

export const metadata: Metadata = {
  title: {
    template: '%s | drinxaver',
    default: 'Drinxaver',
  },
  description: "Drinxaver's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-screen overflow-y-scroll bg-lighterBackground dark:bg-lighterBackground">
        <DashboardHeader />
        <section className="min-h-screen flex flex-col justify-between gap-4 p-4">
          {children}
        </section>
      </div>
    </SidebarProvider>
  );
}
