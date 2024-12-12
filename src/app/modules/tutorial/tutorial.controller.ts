import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";
import { TutorialService } from "./tutorial.service";

const createTutorial: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorialService.createTutorial(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Tutorial created successfully!",
      data: result,
    });
  },
);

const getTutorials: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorialService.getTutorials();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Tutorials fetched successfully!",
      data: result,
    });
  },
);

const getSingleTutorial: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorialService.getSingleTutorial(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Tutorial fetched successfully!",
      data: result,
    });
  },
);

const deleteTutorial: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorialService.deleteTutorial(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Tutorial deleted successfully!",
      data: result,
    });
  },
);

export const TutorialController = {
  createTutorial,
  getTutorials,
  getSingleTutorial,
  deleteTutorial,
};
