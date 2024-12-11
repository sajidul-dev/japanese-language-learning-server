"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)(async (req, res) => {
  const result = await user_service_1.UserService.createUser(req.body);
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_codes_1.StatusCodes.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});
const getUsers = (0, catchAsync_1.default)(async (req, res) => {
  // console.log(req.user, "User");
  const result = await user_service_1.UserService.getUsers();
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_codes_1.StatusCodes.OK,
    success: true,
    message: "User retrieve successfully!",
    data: result,
  });
});
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
  const result = await user_service_1.UserService.updateUser(
    req.params.id,
    req.body,
  );
  (0, sendResponse_1.default)(res, {
    statusCode: http_status_codes_1.StatusCodes.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});
exports.UserController = { createUser, getUsers, updateUser };
