import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const newUser = await User.create(user);
  return newUser;
};

const getUsers = async (): Promise<IUser[] | null> => {
  const users = await User.find();
  return users;
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
