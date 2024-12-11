"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./../modules/auth/auth.route");
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: user_route_1.UserRoutes,
  },
  {
    path: "/auth",
    route: auth_route_1.AuthRoutes,
  },
];
for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}
exports.default = router;
