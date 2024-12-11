import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { VocabularyServices } from "./vocabulary.service";

const createVocabulary: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VocabularyServices.createVocabulary(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vocabulary created successfully!",
      data: result,
    });
  },
);

const getAllVocabulary: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VocabularyServices.getAllVocabulary();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vocabulary retrieve successfully!",
      data: result,
    });
  },
);

const getSingleVocabulary: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VocabularyServices.getSingleVocabulary(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vocabulary retrieve successfully!",
      data: result,
    });
  },
);

const updateVocabulary: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VocabularyServices.updateVocabulary(
      req.params.id,
      req.body,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vocabulary updated successfully!",
      data: result,
    });
  },
);

const deleteVocabulary: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VocabularyServices.deleteVocabulary(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vocabulary deleted successfully!",
      data: result,
    });
  },
);

export const VocabularyController = {
  createVocabulary,
  getAllVocabulary,
  getSingleVocabulary,
  updateVocabulary,
  deleteVocabulary,
};
