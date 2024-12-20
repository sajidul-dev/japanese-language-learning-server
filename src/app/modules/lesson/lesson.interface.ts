import { IUser } from "./../user/user.interface";
import { Model, Types } from "mongoose";

export type ILesson = {
  lesson_name: string;
  lesson_number: number;
  vocabulary_count: number;
  admin_id: Types.ObjectId | IUser;
};

export type LessonModel = Model<ILesson, Record<string, unknown>>;

export type ILessonFilters = {
  searchTerm?: string;
  lesson_number?: number;
  lesson_name?: string;
  admin_id?: string;
};
