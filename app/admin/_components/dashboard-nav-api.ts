import { GaugeIcon, Settings, TrophyIcon, UsersIcon, UsersRoundIcon } from "lucide-react";

type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const dashboardNavApi: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: GaugeIcon,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: UsersRoundIcon,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UsersIcon,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  }
];

export const ManagerNavApi: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: GaugeIcon,
  },
  {
    title: "Points",
    url: "/admin/points",
    icon: TrophyIcon,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  }
];

