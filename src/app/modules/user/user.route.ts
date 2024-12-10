import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/", UserController.getStudents);

export const UserRoutes = router;
