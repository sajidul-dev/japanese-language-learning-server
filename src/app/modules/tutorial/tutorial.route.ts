import { ENUM_USER_ROLE } from "./../../../enum/user";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
// import { LessonValidation } from "./lesson.validation";
// import { LessonController } from "./lesson.controller";
import { TutorialValidation } from "./tutorial.validation";
import { TutorialController } from "./tutorial.controller";

const router = express.Router();

// router.patch(
//   "/:id",
//   validateRequest(LessonValidation.updateLessonZodSchema),
//   auth(ENUM_USER_ROLE.ADMIN),
//   LessonController.updateLesson,
// );
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  TutorialController.getSingleTutorial,
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  TutorialController.deleteTutorial,
);
router.post(
  "/create-tutorial",
  validateRequest(TutorialValidation.createTutorialZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  TutorialController.createTutorial,
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  TutorialController.getTutorials,
);

export const TutorialRoutes = router;
