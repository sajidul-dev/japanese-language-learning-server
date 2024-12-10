import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User created successfully!",
      data: result,
    });
  },
);

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getUsers();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrieve successfully!",
      data: result,
    });
  },
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req.params.id, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  },
);

export const UserController = { createUser, getUsers, updateUser };
