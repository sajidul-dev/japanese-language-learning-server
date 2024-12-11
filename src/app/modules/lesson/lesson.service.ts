import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { IGenericResponse } from "../../../interfaces/common";
import { ILesson, ILessonFilters } from "./lesson.interface";
import { Lesson } from "./lesson.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { lessonSearchableFields } from "./lesson.constant";
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelpers";

const createLesson = async (lesson: ILesson): Promise<ILesson | null> => {
  const newLesson = await Lesson.create(lesson);
  return newLesson;
};

const getLessons = async (
  filters: ILessonFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ILesson[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: lessonSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.entries(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  console.log(JSON.stringify(whereCondition), "Where");
  let lessons;
  try {
    lessons = await Lesson.find(whereCondition)
      .populate("admin_id")
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    console.log("Lessons found:", lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw new Error("Failed to fetch lessons");
  }
  const total = await Lesson.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: lessons,
  };
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
