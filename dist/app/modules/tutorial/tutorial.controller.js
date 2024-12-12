"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const tutorial_service_1 = require("./tutorial.service");
const createTutorial = (0, catchAsync_1.default)(async (req, res) => {
    const result = await tutorial_service_1.TutorialService.createTutorial(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Tutorial created successfully!",
        data: result,
    });
});
const getTutorials = (0, catchAsync_1.default)(async (req, res) => {
    const result = await tutorial_service_1.TutorialService.getTutorials();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Tutorials fetched successfully!",
        data: result,
    });
});
const getSingleTutorial = (0, catchAsync_1.default)(async (req, res) => {
    const result = await tutorial_service_1.TutorialService.getSingleTutorial(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Tutorial fetched successfully!",
        data: result,
    });
});
const deleteTutorial = (0, catchAsync_1.default)(async (req, res) => {
    const result = await tutorial_service_1.TutorialService.deleteTutorial(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Tutorial deleted successfully!",
        data: result,
    });
});
exports.TutorialController = {
    createTutorial,
    getTutorials,
    getSingleTutorial,
    deleteTutorial,
};
