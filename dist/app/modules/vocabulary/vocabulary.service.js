"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyServices = void 0;
const vocabulary_constant_1 = require("./vocabulary.constant");
const paginationHelpers_1 = require("./../../../helpers/paginationHelpers");
const vocabulary_model_1 = require("./vocabulary.model");
const createVocabulary = async (vocabulary) => {
    const newVocabulary = (await (await vocabulary_model_1.Vocabulary.create(vocabulary)).populate("lesson_id")).populate("admin_id");
    return newVocabulary;
};
const getAllVocabulary = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: vocabulary_constant_1.vocabularySearchableFields.map(field => ({
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
    const allVocabulary = await vocabulary_model_1.Vocabulary.find(whereCondition)
        .populate("lesson_id")
        .populate("admin_id")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = await vocabulary_model_1.Vocabulary.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: allVocabulary,
    };
};
const getSingleVocabulary = async (id) => {
    const singleVocabulary = await vocabulary_model_1.Vocabulary.findById(id)
        .populate("lesson_id")
        .populate("admin_id");
    return singleVocabulary;
};
const updateVocabulary = async (id, payload) => {
    const result = await vocabulary_model_1.Vocabulary.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    })
        .populate("lesson_id")
        .populate("admin_id");
    return result;
};
const deleteVocabulary = async (id) => {
    const result = await vocabulary_model_1.Vocabulary.findByIdAndDelete(id);
    return result;
};
exports.VocabularyServices = {
    createVocabulary,
    getAllVocabulary,
    getSingleVocabulary,
    updateVocabulary,
    deleteVocabulary,
};
