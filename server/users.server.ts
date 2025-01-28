import { sql } from "@/db/postgres";
import { User } from "next-auth";
import { cache } from "react";

export const getAllUsers = cache(async (): Promise<User[] | undefined> => {
  try {

    const { rows } = await sql.query<User>("SELECT * FROM users ");

    return rows || null;
  } catch (error) {
    console.log("Error fetching users", error);
    throw new Error("Failed to fetch users.");
  }
});

export const getUserById = cache(
  async (id: number): Promise<User | undefined> => {
    try {
      const { rows } = await sql.query<User>(
        `SELECT * FROM users WHERE user_id = $1`,
        [id]
      );

      console.log({ rows: rows[0] });

      return rows[0] || null;
    } catch (error) {
      console.log("Error fetching user", error);
      throw new Error("Failed to fetch user.");
    }
  }
);

export const getUserByIdentityNumber = cache(
  async (identity_number: string): Promise<User | undefined> => {
    try {
      const { rows } = await sql.query<User>(
        `SELECT * FROM users WHERE identity_number = $1`,
        [identity_number]
      );

      return rows[0] || null;
    } catch (error) {
      console.log("Error fetching user", error);
      throw new Error("Failed to fetch user.");
    }
  }
);

export const getUserByEmail = cache(
  async (email: string): Promise<User | undefined> => {
    try {
      const { rows } = await sql.query<User>(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );

      return rows[0] || null;
    } catch (error) {
      console.log("Error fetching user", error);
      throw new Error("Failed to fetch user.");
    }
  }
);

export const getUserByPhone = cache(
  async (phone: string): Promise<User | undefined> => {
    try {
      const { rows } = await sql.query<User>(
        `SELECT * FROM users WHERE phone = $1`,
        [phone]
      );

      return rows[0] || null;
    } catch (error) {
      console.log("Error fetching user", error);
      throw new Error("Failed to fetch user.");
    }
  }
);

export const getVerificationTokenByEmail = cache(async (email: string) => {
  try {
    const { rows } = await sql.query(
      `SELECT * FROM verification_token WHERE email = $1`,
      [email]
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching verification token", error);
    return error;
  }
});

export const getVerificationTokenByToken = cache(async (token: string | undefined) => {
  try {
    const { rows } = await sql.query(
      `SELECT * FROM verification_token WHERE token = $1`,
      [token]
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching verification token", error);
    return error;
  }
});
