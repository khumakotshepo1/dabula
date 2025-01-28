"use client";

import Link from "next/link";

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NavLinkProps } from "./DashNavbar";
import { SignOutButton } from "@/components/sign-button";

export default function MobileNav({ data }: { data: NavLinkProps[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  let menu;

  if (isOpen) {
    menu = (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        exit={{ opacity: 0, scale: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-background"
      >
        <X
          className="h-6 w-6 absolute right-4 top-10"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="absolute top-10 left-4 flex items-center gap-4">
        </div>
        <div className="flex flex-col gap-4 p-4 mt-36 ml-10 items-start">
          {data.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "text-xl tracking-wide font-bold",
                pathname === item.href && "text-auroraGreen-600 dark:text-auroraGreen-300"
              )}
            >
              {item.title}
            </Link>
          ))}
          <SignOutButton />
        </div>
      </motion.div>
    );
  }

  return (
    <nav className="lg:hidden">
      <div
        className="lg:hidden cursor-pointer sticky bottom-0 left-0 right-0 z-50 py-6 rounded-xl flex items-center justify-center gap-2 bg-background backdrop:blur-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="h-8 w-8" />
      </div>
      <AnimatePresence>
        {menu}
      </AnimatePresence>
    </nav>
  );
}
