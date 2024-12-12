/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import { User } from "./../user/user.model";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interafce";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  // console.log(isUserExist, "user");
  // const isUserExist = await User.findOne({ email }).select("password");

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  // const result = await bcrypt.compare(password, isUserExist.password);
  // console.log(result, "Password matched");

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Credential");
  }

  //create access token & refresh token

  const { email: userEmail, role, password: userPass } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, role, userPass },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { userEmail, role, userPass },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      name: isUserExist.name,
      email: isUserExist.email,
      photo: isUserExist.photo,
      role: isUserExist.role,
    },
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
  }

  const { email } = verifiedToken;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      password: isUserExist.password,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
