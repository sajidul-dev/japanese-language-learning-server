"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyValidation = void 0;
const zod_1 = require("zod");
// Zod validation
const createVocabularyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        word: zod_1.z.string({
            required_error: "Word is required",
        }),
        english_word: zod_1.z.string({ required_error: "English Word is required" }),
        pronunciation: zod_1.z.string({ required_error: "Pronunciation is required" }),
        use: zod_1.z.string({ required_error: "Use is required" }),
        lesson_id: zod_1.z.string({ required_error: "Lesson is required" }),
        admin_id: zod_1.z.string({ required_error: "Admin is required" }),
    }),
});
const updateVocabularyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        word: zod_1.z.string().optional(),
        english_word: zod_1.z.string().optional(),
        pronunciation: zod_1.z.string().optional(),
        use: zod_1.z.string().optional(),
        lesson_id: zod_1.z.string().optional(),
        admin_id: zod_1.z.string().optional(),
    }),
});
exports.VocabularyValidation = {
    createVocabularyZodSchema,
    updateVocabularyZodSchema,
};
