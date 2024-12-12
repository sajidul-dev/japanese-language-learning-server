"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const auth_service_1 = require("../auth/auth.service");
const createUser = async (user) => {
    const newUser = await user_model_1.User.create(user);
    if (!newUser) {
        throw new Error("Failed to create user");
    }
    const { email } = newUser;
    const { password } = user;
    const loginUser = await auth_service_1.AuthService.loginUser({ email, password });
    return loginUser;
};
const getUsers = async (filters, paginationOptions) => {
    const { searchTerm, ...filtersData } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.entries(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const users = await user_model_1.User.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = await user_model_1.User.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: users,
    };
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return user;
};
exports.UserService = { createUser, getUsers, updateUser };
