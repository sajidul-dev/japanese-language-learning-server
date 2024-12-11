import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IGenericResponse } from "../../../interfaces/common";
import { ILesson } from "./lesson.interface";
import { Lesson } from "./lesson.model";

const createLesson = async (lesson: ILesson): Promise<ILesson | null> => {
  const newLesson = await Lesson.create(lesson);
  return newLesson;
};

const getLessons = async (): Promise<IGenericResponse<ILesson[]>> => {
  const lessons = await Lesson.find()
    .populate("admin_id")
    .sort({ createdAt: -1 })
    .lean();
  return { data: lessons };
};

const getSingleLesson = async (id: string): Promise<ILesson | null> => {
  const lesson = await Lesson.findById(id).populate("admin_id").lean();
  return lesson;
};

const updateLesson = async (
  id: string,
  payload: Partial<ILesson>,
): Promise<ILesson | null> => {
  if (payload.lesson_name) {
    const isExist = await Lesson.findOne({ lesson_name: payload.lesson_name });
    if (isExist) {
      throw new ApiError(StatusCodes.CONFLICT, "Lesson name already exists");
    }
  }
  if (payload.lesson_number) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      "Can't update lesson number",
    );
  }
  const result = await Lesson.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteLesson = async (id: string): Promise<ILesson | null> => {
  const result = await Lesson.findByIdAndDelete(id);
  return result;
};

export const LessonService = {
  createLesson,
  getLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
