import { Router } from "express";
import { schedulesController } from "./schedules.controller";
import { roleBasedProtection } from "../../middlewares/roleBasedProtection";
import { ERole } from "../user/user.interface";

export const schedulesRouter = Router();

schedulesRouter.post("/create-schedule", schedulesController.createSchedule);
schedulesRouter.get("/", roleBasedProtection(ERole.ADMIN, ERole.DOCTOR), schedulesController.getSchedule);
schedulesRouter.delete("/:id", schedulesController.deleteScheduleFromDB);
