import { vocabularySearchableFields } from "./vocabulary.constant";
import { SortOrder } from "mongoose";
import { paginationHelper } from "./../../../helpers/paginationHelpers";
import { IPaginationOptions } from "./../../../interfaces/pagination";
import { IVocabulary, IVocabularyFilters } from "./vocabulary.interface";
import { Vocabulary } from "./vocabulary.model";
import { IGenericResponse } from "../../../interfaces/common";

const createVocabulary = async (
  vocabulary: IVocabulary,
): Promise<IVocabulary | null> => {
  const newVocabulary = (
    await (await Vocabulary.create(vocabulary)).populate("lesson_id")
  ).populate("admin_id");
  return newVocabulary;
};

const getAllVocabulary = async (
  filters: IVocabularyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IVocabulary[] | null>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: vocabularySearchableFields.map(field => ({
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

  const allVocabulary = await Vocabulary.find(whereCondition)
    .populate("lesson_id")
    .populate("admin_id")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Vocabulary.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: allVocabulary,
  };
};

const getSingleVocabulary = async (id: string): Promise<IVocabulary | null> => {
  const singleVocabulary = await Vocabulary.findById(id)
    .populate("lesson_id")
    .populate("admin_id");
  return singleVocabulary;
};

const updateVocabulary = async (
  id: string,
  payload: Partial<IVocabulary>,
): Promise<IVocabulary | null> => {
  const result = await Vocabulary.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate("lesson_id")
    .populate("admin_id");
  return result;
};

const deleteVocabulary = async (id: string): Promise<IVocabulary | null> => {
  const result = await Vocabulary.findByIdAndDelete(id);
  return result;
};

export const VocabularyServices = {
  createVocabulary,
  getAllVocabulary,
  getSingleVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
