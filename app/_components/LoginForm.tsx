
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CustomInput } from "@/components/custom-input";
import { LoginType } from "@/zod/types/auth.type";
import { LoginSchema } from "@/zod/schemas/auth.schema";
import { loginAction } from "@/actions/auth.action";
import { Icons } from "@/components/icons";
import { TypographyH1 } from "@/components/typography";

export const LoginForm = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { push } = useRouter();

  const processForm = async (data: LoginType) => {
    try {
      const res = await loginAction(data);

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      if (res?.success) {
        toast.success(res.success);
        push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen bg-blue-100">
      {/* Image Section */}
      <div className="relative h-64 lg:h-screen w-full overflow-hidden bg-gradient-to-b from-blue-100 to-blue-800">
        <Image
          src="/drinking-girl.webp"
          alt="Drinking Girl"
          fill
          className="absolute inset-0 object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-400 dark:bg-blue-600 p-2 lg:px-48 lg:py-16 rounded-lg text-center">
            <TypographyH1 className="text-white animate-bounce">
              Drinks Saver!
            </TypographyH1>
            <p className="text-white text-sm">
              Courtesy of <span className="text-yellow-400 dark:text-yellow-600">Dabulamanzi Restaurant</span>
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:px-28">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(processForm)}
            className="p-8 space-y-6 lg:w-[400px] mx-auto bg-blue-100"
          >
            <h2 className="text-2xl font-bold text-center text-primary">
              Welcome Back!
            </h2>

            <div className="grid gap-4">
              <CustomInput
                control={form.control}
                name="identity_number"
                label="Identity Number"
                placeholder="Enter your identity number or passport number"
                type="text"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            </div>

            <div className="flex flex-col items-center">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full mt-4 bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800"
              >
                {form.formState.isSubmitting ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            <div className="mt-4 text-sm flex flex-col items-center gap-2">
              <div className="flex justify-center items-center gap-2">
                <p>Don&apos;t have an account?</p>
                <Link
                  aria-label="Sign up"
                  href="/register"
                  className="underline font-bold text-blue-600 hover:text-blue-800"
                >
                  Register
                </Link>
              </div>
              <div className="flex justify-center items-center gap-2">
                <p>Forgot your password?</p>
                <Link
                  aria-label="Reset password"
                  href="/auth/reset-password"
                  className="underline font-bold text-blue-600 hover:text-blue-800"
                >
                  Reset Password
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
