"use strict";
/* Validation function */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
// Zod validation
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string({
      required_error: "Name is required",
    }),
    email: zod_1.z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: zod_1.z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
    photo: zod_1.z.string().optional(),
    role: zod_1.z.enum([...user_constant_1.userRole], {
      required_error: "Role is required",
    }),
  }),
});
const updateUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z
      .string()
      .email({ message: "Invalid email address" })
      .optional(),
    password: zod_1.z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .optional(),
    photo: zod_1.z.string().optional(),
    role: zod_1.z.enum([...user_constant_1.userRole], {
      required_error: "Role is required",
    }),
  }),
});
exports.UserValidation = { createUserZodSchema, updateUserZodSchema };
