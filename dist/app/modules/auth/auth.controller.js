"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const config_1 = __importDefault(require("../../../config"));
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await auth_service_1.AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config_1.default.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  (0, sendResponse_1.default)(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: others,
  });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await auth_service_1.AuthService.refreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config_1.default.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  (0, sendResponse_1.default)(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully !",
    data: result,
  });
});
exports.AuthController = {
  loginUser,
  refreshToken,
};
