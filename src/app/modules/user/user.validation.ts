/* Validation function */

import { z } from "zod";
import { userRole } from "./user.constant";

// Zod validation
const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
    photo: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .optional(),
    photo: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: "Role is required",
    }),
  }),
});

export const UserValidation = { createUserZodSchema, updateUserZodSchema };
