import express from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
];

for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}

export default router;
