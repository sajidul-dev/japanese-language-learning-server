import { z } from "zod";

// Zod validation
const createLessonZodSchema = z.object({
  body: z.object({
    lesson_name: z.string({
      required_error: "Name is required",
    }),
    lesson_number: z.number().optional(),
    vocabulary_count: z.number().optional(),
    admin_id: z.string({ required_error: "Admin is required" }),
  }),
});
const updateLessonZodSchema = z.object({
  body: z.object({
    lesson_name: z.string().optional(),
    lesson_number: z.number().optional(),
    vocabulary_count: z.number().optional(),
    admin_id: z.string().optional(),
  }),
});

export const LessonValidation = {
  createLessonZodSchema,
  updateLessonZodSchema,
};
