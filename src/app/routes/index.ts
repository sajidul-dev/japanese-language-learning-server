import { TutorialRoutes } from "./../modules/tutorial/tutorial.route";
import express from "express";
import { AuthRoutes } from "./../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";
import { VocabularyRoutes } from "./../modules/vocabulary/vocabulary.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/lesson",
    route: LessonRoutes,
  },
  {
    path: "/vocabulary",
    route: VocabularyRoutes,
  },
  {
    path: "/tutorial",
    route: TutorialRoutes,
  },
];

for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}

export default router;
