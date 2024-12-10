import express from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);
router.post(
  "/sign-up",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);
router.get("/", UserController.getUsers);

export const UserRoutes = router;
