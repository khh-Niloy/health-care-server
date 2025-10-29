import { Router } from "express";
import { schedulesController } from "./schedules.controller";

export const schedulesRouter = Router();

schedulesRouter.post("/create-schedule", schedulesController.createSchedule);
