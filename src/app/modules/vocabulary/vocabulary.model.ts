import { Schema, model } from "mongoose";
import { IVocabulary, VocabularyModel } from "./vocabulary.interface";

const VocabularySchema = new Schema<IVocabulary>(
  {
    word: { type: String, required: true, unique: true },
    english_word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    use: { type: String, required: true },
    lesson_id: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
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

export const Vocabulary = model<IVocabulary, VocabularyModel>(
  "Vocabulary",
  VocabularySchema,
);
