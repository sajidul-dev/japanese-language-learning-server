import { Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  photo: string;
  role: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
