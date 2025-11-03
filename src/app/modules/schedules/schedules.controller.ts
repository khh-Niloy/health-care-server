import { pick } from "zod/v4/core/util.cjs";
import sendResponse from "../../shared/sendResponse";
import { schedulesService } from "./schedules.service";
import { Request, Response } from "express";

const createSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await schedulesService.createSchedule(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule created successfully",
      data: schedule,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Schedule creation failed",
      data: error,
    });
  }
};

const getSchedule = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { data, meta } = await schedulesService.getScheduleService(
      req.query as Record<string, string>,
      user
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule created successfully",
      meta: meta,
      data: data,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Schedule creation failed",
      data: error,
    });
  }
};

const deleteScheduleFromDB = async (req: Request, res: Response) => {
  try {
    const result = await schedulesService.deleteScheduleFromDB(req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule deleted successfully!",
      data: result,
    });
  } catch (error) {}
};

export const schedulesController = {
  createSchedule,
  getSchedule,
  deleteScheduleFromDB,
};
