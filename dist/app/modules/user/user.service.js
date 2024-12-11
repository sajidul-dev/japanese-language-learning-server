"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const createUser = async (user) => {
    const newUser = await user_model_1.User.create(user);
    return newUser;
};
const getUsers = async () => {
    const users = await user_model_1.User.find();
    return users;
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return user;
};
exports.UserService = { createUser, getUsers, updateUser };
