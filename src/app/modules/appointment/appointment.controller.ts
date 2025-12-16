import { NextFunction, Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import pick from "../../utils/pick";
import { AppointmentService } from "./appointment.service";
import { IJWTPayload } from "../../interface/jwtType";

const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJWTPayload;
    const result = await AppointmentService.createAppointment(user as IJWTPayload, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Appointment created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, ["status", "paymentStatus"]);
    const user = req.user as IJWTPayload;
    const result = await AppointmentService.getMyAppointment(
      user,
      fillters,
      options
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Appointment fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user as IJWTPayload;

    const result = await AppointmentService.updateAppointmentStatus(
      id,
      status,
      user
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Appointment updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
  updateAppointmentStatus,
};
