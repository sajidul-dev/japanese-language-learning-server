import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: false },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.pre("save", async function (next) {
  // hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
