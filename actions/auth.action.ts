"use server";

import { signIn, signOut } from "@/auth";

import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import {
  NewPasswordType,
  ResetPasswordType,
  LoginType,
  RegisterType,
} from "@/zod/types/auth.type";

import {
  NewPasswordSchema,
  ResetPasswordSchema,
  LoginSchema,
  RegisterSchema,
} from "@/zod/schemas/auth.schema";

import { hash } from "bcryptjs";
import { generateVerificationToken } from "@/utils/token";
import { sendPasswordReset } from "@/utils/mail";
import { getErrorMessage } from "@/utils/error-message";
import { sql } from "@/db/postgres";
import { normalizePhoneNumber } from "@/utils/country-phone-codes";
import { emailChecker } from "@/utils/email-checker";
import { getUserByEmail, getUserByPhone } from "@/server/users.server";

export const registerAction = async (data: RegisterType) => {
  try {
    const results = RegisterSchema.safeParse(data);

    if (!results.success) {
      return {
        error: getErrorMessage(results.error),
      };
    }

    const {
      last_name,
      first_name,
      email,
      phone,
      identity_number,
      date_of_birth,
      street,
      city,
      province,
      country,
      zip,
      password,
      confirm_password,
    } = results.data;

    if (password !== confirm_password) {
      return {
        error: "Passwords do not match",
      };
    }

    const code = "ZA";

    const hashedPassword = await hash(password, 10);

    let verifiedPhone: string;

    try {
      verifiedPhone = normalizePhoneNumber(phone, code);
    } catch (error) {
      return {
        error: getErrorMessage(error), // Handle the error from normalization
      };
    }
    const emailVerified = await emailChecker(email);


    if (!emailVerified) {
      return {
        error: "Invalid email",
      };
    }

    const residentialAddress = `${street}, ${city}, ${province}, ${country}, ${zip}`;

    const userExists = await getUserByEmail(email);

    if (userExists) {
      return {
        error: "User already exists",
      };
    }

    const phoneExists = await getUserByPhone(verifiedPhone);

    if (phoneExists) {
      return {
        error: "Cellphone number already exists",
      };
    }

    const isOldUser = new Date().getFullYear() - date_of_birth.getFullYear() >= 18;

    if (!isOldUser) {
      return {
        error: "User must be at least 18 years old",
      };
    }

    await sql.query(
      "INSERT INTO users (first_name, last_name, email, phone, identity_number, date_of_birth, residential_address, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [first_name, last_name, email, verifiedPhone, identity_number, date_of_birth, residentialAddress, hashedPassword],
    );


    return {
      success: "User registered successfully",
    };
  } catch (error) {
    console.error("Error during user registration:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const loginAction = async (data: LoginType) => {
  try {
    const results = LoginSchema.safeParse(data);

    if (results.success) {
      const { identity_number, password } = results.data;

      const res = await signIn("credentials", {
        identity_number,
        password,

        redirect: false,
      });

      if (res) {
        return {
          success: "Login successful",
        };
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials.",
          };
        default:
          return {
            error: "Something went wrong.",
          };
      }
    }
    throw error;
  }
};

export const googleAction = async () => {
  await signIn("google");
};

export const signOutAction = async () => {
  await signOut();
};

export const resetPasswordAction = async (data: ResetPasswordType) => {
  try {
    const results = ResetPasswordSchema.safeParse(data);
    if (results.success) {
      const { email } = results.data;

      const session = await sql.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);

      if (session && session.rows.length <= 0) {
        redirect("/auth/login");
      }

      const verificationToken = await generateVerificationToken(email);

      const sent = await sendPasswordReset(email, verificationToken.token);

      if (sent) {
        return {
          success: "Password reset email sent successfully",
        };
      }
    }
  } catch (error) {
    console.error("Error during passwordResetAction:", error);
    redirect("/auth/login");
  }
};

export const newPasswordAction = async (
  token: string | undefined,
  data: NewPasswordType,
) => {
  try {
    const results = NewPasswordSchema.safeParse(data);

    if (results.success) {
      const { password, confirm_password } = results.data;

      if (password !== confirm_password) {
        return {
          error: "Passwords do not match",
        };
      }

      const hashedPassword = await hash(password, 10);

      if (!token) {
        return {
          error: "Invalid token",
        };
      }

      const { rows: existingToken } = await sql.query(
        `SELECT * FROM verification_token WHERE token = $1`,
        [token],
      );

      if (existingToken) {
        const hasExpired = new Date(existingToken[0].expires_at) < new Date();

        if (hasExpired) {
          return {
            error: "Token has expired",
          };
        }

        const existingUser = await getUserByEmail(existingToken[0].email);

        if (!existingUser) {
          return {
            error: "Invalid token",
          };
        }

        await sql.query(
          `UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
          [hashedPassword, existingUser.id],
        );

        await sql.query(`DELETE FROM verification_token WHERE t = $1`, [token]);

        return {
          success: "Password updated successfully",
        };
      }
    }
  } catch (error) {
    console.error("Error during passwordUpdateAction:", error);
    return null;
  }
};
