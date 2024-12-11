/* eslint-disable @typescript-eslint/no-this-alias */
import { CallbackError, Schema, model } from "mongoose";
import { ILesson, LessonModel } from "./lesson.interface";

const LessonSchema = new Schema<ILesson>(
  {
    lesson_name: { type: String, required: true, unique: true },
    lesson_number: { type: Number, required: false, default: 1 },
    vocabulary_count: { type: Number, required: false },
    admin_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// Middleware for auto-incrementing lesson_number
LessonSchema.pre("save", async function (next) {
  const doc = this;

  if (!doc.isNew) return next();

  try {
    const lastLesson = await model<ILesson>("Lesson")
      .findOne({})
      .sort({ lesson_number: -1 })
      .select("lesson_number");

    doc.lesson_number = lastLesson ? lastLesson.lesson_number + 1 : 1;

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const Lesson = model<ILesson, LessonModel>("Lesson", LessonSchema);
