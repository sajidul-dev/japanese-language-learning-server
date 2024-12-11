import { jwtHelpers } from "./../../../helpers/jwtHelpers";
import { User } from "./../user/user.model";
import { ILoginUser, ILoginUserResponse } from "./auth.interafce";
import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
  }

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
  };
};

export const AuthService = {
  loginUser,
};
