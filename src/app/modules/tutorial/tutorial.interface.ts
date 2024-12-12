import { ILesson } from "./../lesson/lesson.interface";
import { IUser } from "./../user/user.interface";
import { Model, Types } from "mongoose";

export type ITutorial = {
  tutorial_link: string;
  lesson_id: Types.ObjectId | ILesson;
  admin_id: Types.ObjectId | IUser;
};

export type TutorialModel = Model<ITutorial, Record<string, unknown>>;
