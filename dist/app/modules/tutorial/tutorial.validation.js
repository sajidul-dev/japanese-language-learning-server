"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialValidation = void 0;
const zod_1 = require("zod");
const createTutorialZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        tutorial_link: zod_1.z.string({
            required_error: "Link is required",
        }),
        lesson_id: zod_1.z.string({
            required_error: "Lesson id required",
        }),
        admin_id: zod_1.z.string({ required_error: "Admin is required" }),
    }),
});
const updateLessonZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        lesson_name: zod_1.z.string().optional(),
        lesson_number: zod_1.z.number().optional(),
        vocabulary_count: zod_1.z.number().optional(),
        admin_id: zod_1.z.string().optional(),
    }),
});
exports.TutorialValidation = {
    createTutorialZodSchema,
    updateLessonZodSchema,
};
