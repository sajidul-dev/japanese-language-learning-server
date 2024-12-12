import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { IPaginationOptions } from "./../../../interfaces/pagination";
import { userSearchableFields } from "./user.constant";
import { IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";
import { IGenericResponse } from "../../../interfaces/common";
import { AuthService } from "../auth/auth.service";
import { ILoginUserResponse } from "../auth/auth.interafce";

const createUser = async (
  user: IUser,
): Promise<Partial<ILoginUserResponse>> => {
  const newUser = await User.create(user);
  if (!newUser) {
    throw new Error("Failed to create user");
  }
  const { email } = newUser;
  const { password } = user;
  const loginUser = await AuthService.loginUser({ email, password });
  return loginUser;
};

const getUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[] | null>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const users = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: users,
  };
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return user;
};

export const UserService = { createUser, getUsers, updateUser };
