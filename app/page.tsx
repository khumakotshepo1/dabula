import { auth } from "@/auth";
import { LoginForm } from "./_components/LoginForm";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();
  const role = session?.user?.role;


  if (session && role === "ADMIN" || role === "MANAGER") {
    redirect("/admin");
  }

  if (session && role === "USER") {
    redirect("/dashboard");
  }

  return (
    <LoginForm />
  );
}
