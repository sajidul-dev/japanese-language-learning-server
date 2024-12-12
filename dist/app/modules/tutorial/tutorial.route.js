"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialRoutes = void 0;
const user_1 = require("./../../../enum/user");
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
// import { LessonValidation } from "./lesson.validation";
// import { LessonController } from "./lesson.controller";
const tutorial_validation_1 = require("./tutorial.validation");
const tutorial_controller_1 = require("./tutorial.controller");
const router = express_1.default.Router();
// router.patch(
//   "/:id",
//   validateRequest(LessonValidation.updateLessonZodSchema),
//   auth(ENUM_USER_ROLE.ADMIN),
//   LessonController.updateLesson,
// );
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), tutorial_controller_1.TutorialController.getSingleTutorial);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), tutorial_controller_1.TutorialController.deleteTutorial);
router.post("/create-tutorial", (0, validateRequest_1.default)(tutorial_validation_1.TutorialValidation.createTutorialZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), tutorial_controller_1.TutorialController.createTutorial);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), tutorial_controller_1.TutorialController.getTutorials);
exports.TutorialRoutes = router;
