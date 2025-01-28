import { z } from "zod";

export const LoginSchema = z.object({
  identity_number: z.string().min(1),
  password: z.string().min(6),
});

export const RegisterSchema = z
  .object({
    // Employee Details
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phone: z.string().min(1, 'Phone is required'),
    identity_number: z.string().min(1, 'Identity number is required'),
    date_of_birth: z.coerce.date().min(new Date(1900, 0, 1), 'Date of birth is required'),

    // Address Fields
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    province: z.string().min(1, 'Province is required'),
    country: z.string().min(1, 'Country is required'),
    zip: z.string().min(1, 'Zip is required'),

    // Password Fields
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .trim(),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const ResetPasswordSchema = z.object({
  email: z.string().trim(),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(32, {
        message: "Password must be at most 32 characters long",
      })
      .trim(),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
