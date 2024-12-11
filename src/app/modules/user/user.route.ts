import { ENUM_USER_ROLE } from "./../../../enum/user";
import express from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";

const router = express.Router();

router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser,
);
router.post(
  "/sign-up",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getUsers);

export const UserRoutes = router;
