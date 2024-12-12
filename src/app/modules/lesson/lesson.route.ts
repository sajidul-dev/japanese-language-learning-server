import { ENUM_USER_ROLE } from "./../../../enum/user";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { LessonValidation } from "./lesson.validation";
import { LessonController } from "./lesson.controller";

const router = express.Router();

router.patch(
  "/:id",
  validateRequest(LessonValidation.updateLessonZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  LessonController.updateLesson,
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  LessonController.getSingleLesson,
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  LessonController.deleteLesson,
);
router.post(
  "/create-lesson",
  validateRequest(LessonValidation.createLessonZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  LessonController.createLesson,
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  LessonController.getLessons,
);

export const LessonRoutes = router;
