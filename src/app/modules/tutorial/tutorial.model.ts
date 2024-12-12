import { Schema, model } from "mongoose";
import { ITutorial, TutorialModel } from "./tutorial.interface";

const TutorialSchema = new Schema<ITutorial>(
  {
    tutorial_link: { type: String, required: true, unique: true },
    lesson_id: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
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

export const Tutorial = model<ITutorial, TutorialModel>(
  "Tutorial",
  TutorialSchema,
);
