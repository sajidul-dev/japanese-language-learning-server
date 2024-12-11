import { z } from "zod";

// Zod validation
const createVocabularyZodSchema = z.object({
  body: z.object({
    word: z.string({
      required_error: "Word is required",
    }),
    english_word: z.string({ required_error: "English Word is required" }),
    pronunciation: z.string({ required_error: "Pronunciation is required" }),
    use: z.string({ required_error: "Use is required" }),
    lesson_id: z.string({ required_error: "Lesson is required" }),
    admin_id: z.string({ required_error: "Admin is required" }),
  }),
});
const updateVocabularyZodSchema = z.object({
  body: z.object({
    word: z.string().optional(),
    english_word: z.string().optional(),
    pronunciation: z.string().optional(),
    use: z.string().optional(),
    lesson_id: z.string().optional(),
    admin_id: z.string().optional(),
  }),
});

export const VocabularyValidation = {
  createVocabularyZodSchema,
  updateVocabularyZodSchema,
};
