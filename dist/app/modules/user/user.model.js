"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
// import bcrypt from "bcryptjs";
// import config from "../../../config";
const UserSchema = new mongoose_1.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: false, default: null },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
UserSchema.statics.isUserExist = async function (email) {
  return await exports.User.findOne(
    { email },
    { email: 1, password: 1, role: 1 },
  );
};
UserSchema.statics.isPasswordMatched = async function (
  givenPassword,
  savedPassword,
) {
  return await bcryptjs_1.default.compare(givenPassword, savedPassword);
};
UserSchema.pre("save", async function (next) {
  // hash password
  this.password = await bcryptjs_1.default.hash(
    this.password,
    Number(config_1.default.bcrypt_salt_rounds),
  );
  next();
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
