import { ILesson } from "./../lesson/lesson.interface";
import { IUser } from "./../user/user.interface";
import { Model, Types } from "mongoose";

export type IVocabulary = {
  word: string;
  english_word: string;
  pronunciation: string;
  use: string;
  lesson_id: Types.ObjectId | ILesson;
  admin_id: Types.ObjectId | IUser;
};

export type VocabularyModel = Model<IVocabulary, Record<string, unknown>>;
