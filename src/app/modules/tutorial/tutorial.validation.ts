import { z } from "zod";

const createTutorialZodSchema = z.object({
  body: z.object({
    tutorial_link: z.string({
      required_error: "Link is required",
    }),
    lesson_id: z.string({
      required_error: "Lesson id required",
    }),
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

export const TutorialValidation = {
  createTutorialZodSchema,
  updateLessonZodSchema,
};
