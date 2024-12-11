"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_1 = require("./../../../enum/user");
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.patch(
  "/:id",
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateUserZodSchema,
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.updateUser,
);
router.post(
  "/sign-up",
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.createUserZodSchema,
  ),
  user_controller_1.UserController.createUser,
);
router.get(
  "/",
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getUsers,
);
exports.UserRoutes = router;
