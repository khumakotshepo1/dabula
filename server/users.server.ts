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

export const getCustomers = cache(async (): Promise<CustomerPropType[] | null> => {
  try {
    const { rows } = await sql.query<CustomerPropType>(`
      SELECT 
        u.*, 
        COUNT(p.points_earned) AS points_earned, 
        COUNT(q.quart_id) AS quarts_redeemed, 
        COUNT(r.redemption_id) AS redemptions
      FROM users u
      LEFT JOIN points p ON u.user_id = p.user_id
      LEFT JOIN quart q ON u.user_id = q.user_id
      LEFT JOIN redemptions r ON u.user_id = r.user_id
      GROUP BY u.user_id
    `);

    return rows.length > 0 ? rows : null; // Return null if no rows found
  } catch (error) {
    console.log("Error fetching customers", error);
    throw new Error("Failed to fetch customers.");
  }
});

export const getCustomerByIdentityNumber = cache(async (identity_number: string): Promise<CustomerPropType | null> => {
  try {
    const { rows } = await sql.query<CustomerPropType>(
      `SELECT u.*, p.*, r.* FROM users u LEFT JOIN points p ON u.user_id = p.user_id LEFT JOIN quart q ON u.user_id = q.user_id LEFT JOIN redemptions r ON u.user_id = r.user_id WHERE u.identity_number = $1`,
      [identity_number]
    );

    return rows[0] || null;
  } catch (error) {
    console.log("Error fetching customer", error);
    throw new Error("Failed to fetch customer.");
  }
});
