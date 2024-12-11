"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const jwtHelpers_1 = require("./../../../helpers/jwtHelpers");
const user_model_1 = require("./../user/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const loginUser = async payload => {
  const { email, password } = payload;
  const isUserExist = await user_model_1.User.isUserExist(email);
  // console.log(isUserExist, "user");
  // const isUserExist = await User.findOne({ email }).select("password");
  if (!isUserExist) {
    throw new ApiError_1.default(
      http_status_codes_1.StatusCodes.NOT_FOUND,
      "User does not exist",
    );
  }
  // const result = await bcrypt.compare(password, isUserExist.password);
  // console.log(result, "Password matched");
  if (
    isUserExist.password &&
    !(await user_model_1.User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError_1.default(
      http_status_codes_1.StatusCodes.UNAUTHORIZED,
      "Invalid Credential",
    );
  }
  //create access token & refresh token
  const { email: userEmail, role, password: userPass } = isUserExist;
  const accessToken = jwtHelpers_1.jwtHelpers.createToken(
    { userEmail, role, userPass },
    config_1.default.jwt.secret,
    config_1.default.jwt.expires_in,
  );
  const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
    { userEmail, role, userPass },
    config_1.default.jwt.refresh_secret,
    config_1.default.jwt.refresh_expires_in,
  );
  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async token => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
      token,
      config_1.default.jwt.refresh_secret,
    );
  } catch (err) {
    throw new ApiError_1.default(
      http_status_codes_1.StatusCodes.FORBIDDEN,
      "Invalid Refresh Token",
    );
  }
  const { email } = verifiedToken;
  const isUserExist = await user_model_1.User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError_1.default(
      http_status_codes_1.StatusCodes.NOT_FOUND,
      "User does not exist",
    );
  }
  const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      password: isUserExist.password,
    },
    config_1.default.jwt.secret,
    config_1.default.jwt.expires_in,
  );
  return {
    accessToken: newAccessToken,
  };
};
exports.AuthService = {
  loginUser,
  refreshToken,
};
