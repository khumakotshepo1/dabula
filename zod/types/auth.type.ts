import { z } from "zod";
import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetPasswordSchema } from "../schemas/auth.schema";

export type LoginType = z.infer<typeof LoginSchema>;

export type RegisterType = z.infer<typeof RegisterSchema>;

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
