
"use client";

import { TypographyH1, TypographyP } from "@/components/typography";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { CalendarIcon, TrophyIcon } from "lucide-react";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import { DashNavbar } from "./DashNavbar";

export function DashboardCard({ user }: { user: User }) {
  const [points, setPoints] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    setPoints(2082);
    setDays(10);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-all duration-300">
      <DashNavbar />
      <TypographyH1 className="flex gap-2 text-lg font-semibold lg:mt-16">
        Welcome back{" "}
        <span className="text-blue-400 dark:text-blue-600 capitalize">
          {user.first_name} {user.last_name}
        </span>
      </TypographyH1>

      <section className="flex-1 p-3 h-screen flex flex-col lg:flex-row items-center justify-around gap-4">
        <div className="flex flex-col gap-2 items-center justify-center rounded-full border-8 border-blue-400 h-60 w-60">
          <TypographyP className="text-zinc-600 dark:text-zinc-400">
            Your current balance is
          </TypographyP>
          <div className="flex w-full items-center justify-center">
            <TrophyIcon className="w-16 h-16 text-yellow-400 animate-pulse" />
            <AnimatedNumber
              className="font-mono text-3xl font-light text-zinc-800 dark:text-zinc-50"
              springOptions={{
                bounce: 0,
                duration: 2000,
              }}
              value={points}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center rounded-full border-8 border-blue-400 h-60 w-60">
          <TypographyP className="text-zinc-600 dark:text-zinc-400">
            Dates left to claim
          </TypographyP>
          <div className="flex w-full items-center justify-center">
            <CalendarIcon className="w-16 h-16 text-blue-400 animate-pulse" />
            <AnimatedNumber
              className="font-mono text-3xl font-light text-zinc-800 dark:text-zinc-50"
              springOptions={{
                bounce: 0,
                duration: 2000,
              }}
              value={days}
            />
          </div>

        </div>

      </section>
    </div>
  );
}
