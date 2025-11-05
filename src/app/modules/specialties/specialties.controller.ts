import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { SpecialtiesService } from "./specialties.service";
import sendResponse from "../../shared/sendResponse";

const inserIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await SpecialtiesService.inserIntoDB(req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Specialties created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SpecialtiesService.getAllFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Specialties data fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await SpecialtiesService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Specialty deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const SpecialtiesController = {
  inserIntoDB,
  getAllFromDB,
  deleteFromDB,
};
