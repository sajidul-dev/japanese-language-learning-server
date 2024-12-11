import { Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "email" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
