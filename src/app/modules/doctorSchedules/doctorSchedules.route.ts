import { Router } from "express";
import { doctorSchedulesController } from "./doctorSchedules.controller";
import { roleBasedProtection } from "../../middlewares/roleBasedProtection";
import { ERole } from "../user/user.interface";

export const doctorSchedulesRoute = Router();

doctorSchedulesRoute.post(
  "/book-schedule",
  roleBasedProtection(ERole.ADMIN, ERole.DOCTOR),
  doctorSchedulesController.bookSchedule
);

doctorSchedulesRoute.get(
  "/my-schedule",
  roleBasedProtection(ERole.ADMIN, ERole.DOCTOR),
  doctorSchedulesController.mySchedule
);
