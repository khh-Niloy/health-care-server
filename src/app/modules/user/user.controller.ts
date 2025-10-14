import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";
import { Response } from "express";
import { Request } from "express";

const createPatient = async (req: Request, res: Response) => {
  try {
    const data = await userService.createPatientService(
      req.body,
      req.file as Express.Multer.File
    );
    console.log(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Patient created successfully",
      data: data,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Patient created failed",
      data: error,
    });
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

export const userController = {
  createPatient,
  getAllUsers,
};
