"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRoutes = void 0;
const user_1 = require("./../../../enum/user");
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const lesson_validation_1 = require("./lesson.validation");
const lesson_controller_1 = require("./lesson.controller");
const router = express_1.default.Router();
router.patch("/:id", (0, validateRequest_1.default)(lesson_validation_1.LessonValidation.updateLessonZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), lesson_controller_1.LessonController.updateLesson);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), lesson_controller_1.LessonController.getSingleLesson);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), lesson_controller_1.LessonController.deleteLesson);
router.post("/create-lesson", (0, validateRequest_1.default)(lesson_validation_1.LessonValidation.createLessonZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), lesson_controller_1.LessonController.createLesson);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), lesson_controller_1.LessonController.getLessons);
exports.LessonRoutes = router;
