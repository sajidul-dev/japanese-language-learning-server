"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyController = void 0;
const pagination_1 = require("./../../../constants/pagination");
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const vocabulary_service_1 = require("./vocabulary.service");
const vocabulary_constant_1 = require("./vocabulary.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createVocabulary = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vocabulary_service_1.VocabularyServices.createVocabulary(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary created successfully!",
        data: result,
    });
});
const getAllVocabulary = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, vocabulary_constant_1.vocabularyFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await vocabulary_service_1.VocabularyServices.getAllVocabulary(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary retrieve successfully!",
        data: result,
    });
});
const getSingleVocabulary = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vocabulary_service_1.VocabularyServices.getSingleVocabulary(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary retrieve successfully!",
        data: result,
    });
});
const updateVocabulary = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vocabulary_service_1.VocabularyServices.updateVocabulary(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary updated successfully!",
        data: result,
    });
});
const deleteVocabulary = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vocabulary_service_1.VocabularyServices.deleteVocabulary(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary deleted successfully!",
        data: result,
    });
});
exports.VocabularyController = {
    createVocabulary,
    getAllVocabulary,
    getSingleVocabulary,
    updateVocabulary,
    deleteVocabulary,
};
