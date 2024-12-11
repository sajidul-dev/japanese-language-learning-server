import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { LessonService } from "./lesson.service";

const createLesson: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LessonService.createLesson(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lesson created successfully!",
      data: result,
    });
  },
);
const getLessons: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LessonService.getLessons();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lesson retrieve successfully!",
      data: result.data,
    });
  },
);

const getSingleLesson: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LessonService.getSingleLesson(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lesson retrieve successfully!",
      data: result,
    });
  },
);

const updateLesson: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LessonService.updateLesson(req.params.id, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lesson updated successfully!",
      data: result,
    });
  },
);

const deleteLesson: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LessonService.deleteLesson(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lesson deleted successfully!",
      data: result,
    });
  },
);

export const LessonController = {
  createLesson,
  getLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
