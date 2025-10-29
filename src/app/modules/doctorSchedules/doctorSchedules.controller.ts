import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { doctorSchedulesService } from "./doctorSchedules.service";
const bookSchedule = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const schedule = await doctorSchedulesService.bookScheduleService(req.body, user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule booked successfully",
      data: schedule,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Schedule booking failed",
      data: error,
    });
  }
};

const mySchedule = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const mySchedule = await doctorSchedulesService.myScheduleService(user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My schedule fetched successfully",
      data: mySchedule,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "My schedule fetching failed",
      data: error,
    });
  }
};

export const doctorSchedulesController = {
  bookSchedule,
  mySchedule,
};
