"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tutorial_route_1 = require("./../modules/tutorial/tutorial.route");
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const lesson_route_1 = require("../modules/lesson/lesson.route");
const vocabulary_route_1 = require("./../modules/vocabulary/vocabulary.route");
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
    {
        path: "/lesson",
        route: lesson_route_1.LessonRoutes,
    },
    {
        path: "/vocabulary",
        route: vocabulary_route_1.VocabularyRoutes,
    },
    {
        path: "/tutorial",
        route: tutorial_route_1.TutorialRoutes,
    },
];
for (const route of moduleRoutes) {
    router.use(route.path, route.route);
}
exports.default = router;
