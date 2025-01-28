import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./config";

import { getUserByIdentityNumber } from "@/server/users.server";
import { LoginSchema } from "@/zod/schemas/auth.schema";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { identity_number, password } = parsedCredentials.data;

          const user = await getUserByIdentityNumber(identity_number);

          if (!user) return null;
          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) {
            console.log("Returning user:", user);
            return user;
          }
        }

        return null;
      },
    }),
  ],
});
