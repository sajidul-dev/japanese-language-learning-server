"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const lesson_constant_1 = require("./lesson.constant");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const lesson_service_1 = require("./lesson.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const createLesson = (0, catchAsync_1.default)(async (req, res) => {
    const result = await lesson_service_1.LessonService.createLesson(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson created successfully!",
        data: result,
    });
});
const getLessons = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, lesson_constant_1.lessonFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = await lesson_service_1.LessonService.getLessons(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson retrieve successfully!",
        data: result.data,
    });
});
const getSingleLesson = (0, catchAsync_1.default)(async (req, res) => {
    const result = await lesson_service_1.LessonService.getSingleLesson(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson retrieve successfully!",
        data: result,
    });
});
const updateLesson = (0, catchAsync_1.default)(async (req, res) => {
    const result = await lesson_service_1.LessonService.updateLesson(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson updated successfully!",
        data: result,
    });
});
const deleteLesson = (0, catchAsync_1.default)(async (req, res) => {
    const result = await lesson_service_1.LessonService.deleteLesson(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson deleted successfully!",
        data: result,
    });
});
exports.LessonController = {
    createLesson,
    getLessons,
    getSingleLesson,
    updateLesson,
    deleteLesson,
};
