import Link from "next/link";
import DashboardNavbarMobile from "./DashboardNavbarMobile";
import { SignOutButton } from "@/components/sign-button";

export type NavLinkProps = {
  href: string;
  title: string;
}

export function DashNavbar() {


  const data: NavLinkProps[] = [
    { href: "/dashboard", title: "dashboard" },
    { href: "/dashboard/settings", title: "settings" },
  ];

  return (
    <header className="flex items-center justify-between p-4 w-full">
      <h1><span className="hidden lg:block">Dabulamanzi</span> Drin<span className="text-blue-400 text-xl font-black">X</span>aver</h1>
      <div className="flex items-center gap-4">
        <nav className="hidden lg:flex items-center gap-4">
          {data.map(({ href, title }) => (
            <Link key={href} href={href} className="text-blue-400 hover:text-blue-500">
              {title}
            </Link>
          ))}
          <SignOutButton />
        </nav>
        <DashboardNavbarMobile data={data} />

      </div>
    </header>
  )
}
