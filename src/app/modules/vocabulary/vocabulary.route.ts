import { ENUM_USER_ROLE } from "./../../../enum/user";
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { VocabularyValidation } from "./vocabulary.validation";
import { VocabularyController } from "./vocabulary.controller";

const router = express.Router();

router.patch(
  "/:id",
  validateRequest(VocabularyValidation.updateVocabularyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  VocabularyController.updateVocabulary,
);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  VocabularyController.getSingleVocabulary,
);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  VocabularyController.deleteVocabulary,
);
router.post(
  "/create-vocabulary",
  validateRequest(VocabularyValidation.createVocabularyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  VocabularyController.createVocabulary,
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  VocabularyController.getAllVocabulary,
);

export const VocabularyRoutes = router;
