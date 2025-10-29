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
}

export const schedulesController = {
    createSchedule,
}