"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const LessonSchema = new mongoose_1.Schema({
    lesson_name: { type: String, required: true, unique: true },
    lesson_number: { type: Number, required: false, default: 1 },
    vocabulary_count: { type: Number, required: false },
    admin_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Middleware for auto-incrementing lesson_number
LessonSchema.pre("save", async function (next) {
    const doc = this;
    if (!doc.isNew)
        return next();
    try {
        const lastLesson = await (0, mongoose_1.model)("Lesson")
            .findOne({})
            .sort({ lesson_number: -1 })
            .select("lesson_number");
        doc.lesson_number = lastLesson ? lastLesson.lesson_number + 1 : 1;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.Lesson = (0, mongoose_1.model)("Lesson", LessonSchema);
