import { Router } from "express";
import { doctorSchedulesController } from "./doctorSchedules.controller";
import { roleBasedProtection } from "../../middlewares/roleBasedProtection";
import { ERole } from "../user/user.interface";
import { DoctorScheduleValidation } from "./doctorSchedules.validation";
import { validateSchema } from "../../middlewares/validateSchema";

export const doctorSchedulesRoute = Router();

doctorSchedulesRoute.post(
  "/book-schedule",
  roleBasedProtection(ERole.ADMIN, ERole.DOCTOR),
  validateSchema(DoctorScheduleValidation.createDoctorScheduleValidationSchema),
  doctorSchedulesController.bookSchedule
);

doctorSchedulesRoute.get(
  "/my-schedule",
  roleBasedProtection(ERole.ADMIN, ERole.DOCTOR),
  doctorSchedulesController.mySchedule
);
