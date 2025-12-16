import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";
import { NextFunction, Response } from "express";
import { Request } from "express";

const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.createPatientService(
      req.body,
      req.file as Express.Multer.File
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Patient created successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { data, meta } = await userService.getAllUsersService(
      req.query as Record<string, string>
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users fetched successfully",
      meta: meta,
      data: data,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Users fetched failed",
      data: error,
    });
  }
};

const createDoctor = async (req: Request, res: Response) => {
  try {
    const data = await userService.createDoctorService(
      req.body,
      req.file as Express.Multer.File
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Doctor created successfully",
      data: data,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Doctor created failed",
      data: error,
    });
  }
};

export const userController = {
  createPatient,
  getAllUsers,
  createDoctor,
};
