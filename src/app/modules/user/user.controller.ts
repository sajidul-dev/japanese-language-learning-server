import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const getStudents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getStudents();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrieve successfully!",
      data: result,
    });
  },
);

export const UserController = { getStudents };
