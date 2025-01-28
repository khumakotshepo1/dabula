
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

  const role = user.role;

  useEffect(() => {
    setPoints(2082);
    setDays(10);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-all duration-300">
      <DashNavbar role={role} />
      <TypographyH1 className="flex gap-2 text-lg font-semibold lg:mt-16">
        Welcome back{" "}
        <span className="text-blue-400 dark:text-blue-600 capitalize text-lg">
          {user.first_name} {user.last_name}
        </span>
      </TypographyH1>

      <section className="flex-1 p-3 h-screen flex flex-col lg:flex-row items-center lg:items-start lg:mt-28 justify-center lg:justify-around">
        <div className="flex flex-col gap-2 items-center justify-center rounded-full border-8 border-blue-400 h-52 w-52">
          <TypographyP className="text-zinc-600 dark:text-zinc-400 text-sm">
            Balance
          </TypographyP>
          <div className="flex w-full items-center justify-center gap-2">
            <TrophyIcon className="w-6 h-6 text-yellow-400 animate-pulse" />
            <AnimatedNumber
              className="font-mono text-xl font-light text-zinc-800 dark:text-zinc-50"
              springOptions={{
                bounce: 0,
                duration: 2000,
              }}
              value={points}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center rounded-full border-8 border-blue-400 h-36 w-36">
          <TypographyP className="text-zinc-600 dark:text-zinc-400 text-sm">
            Day left to claim
          </TypographyP>
          <div className="flex w-full items-center justify-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-400 animate-pulse" />
            <AnimatedNumber
              className="font-mono text-xl font-light text-zinc-800 dark:text-zinc-50"
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
