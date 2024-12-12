"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const lesson_model_1 = require("./lesson.model");
const lesson_constant_1 = require("./lesson.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createLesson = async (lesson) => {
    const newLesson = await lesson_model_1.Lesson.create(lesson);
    return newLesson;
};
const getLessons = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: lesson_constant_1.lessonSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const lessons = await lesson_model_1.Lesson.find(whereCondition)
        .populate("admin_id")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = await lesson_model_1.Lesson.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: lessons,
    };
};
const getSingleLesson = async (id) => {
    const lesson = await lesson_model_1.Lesson.findById(id).populate("admin_id").lean();
    return lesson;
};
const updateLesson = async (id, payload) => {
    if (payload.lesson_name) {
        const isExist = await lesson_model_1.Lesson.findOne({ lesson_name: payload.lesson_name });
        if (isExist) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Lesson name already exists");
        }
    }
    if (payload.lesson_number) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "Can't update lesson number");
    }
    const result = await lesson_model_1.Lesson.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteLesson = async (id) => {
    const result = await lesson_model_1.Lesson.findByIdAndDelete(id);
    return result;
};
exports.LessonService = {
    createLesson,
    getLessons,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
