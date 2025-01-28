import { auth } from "@/auth";
import { DashboardCard } from "./_components/DashboardCard";
import { User } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await auth()

  if (!session) {
    redirect("/")
  }

  const { user } = session as { user: User }



  return (
    <DashboardCard user={user} />
  )
}
