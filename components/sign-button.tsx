import { signOutAction } from "@/actions/auth.action";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function SignButton() {
  return (
    <>
      <Link href="/">
        <Button
          variant="secondary"
          type="button"
          aria-label="Login" className="font-bold hidden md:block transition-all transform hover:scale-105">

          Login
        </Button>
        <LogInIcon className="h-8 w-8 md:hidden text-nordGreenSlg" aria-label="Login" />
      </Link>
    </>
  );
}

export const SignOutButton = () => {
  return (
    <form className="w-fit" action={signOutAction}>
      <Button variant={"destructive"} aria-label="Logout" role="button" type="submit">
        Logout
      </Button>
    </form>
  );
};
