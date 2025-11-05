import express from "express";
import { roleBasedProtection } from "../../middlewares/roleBasedProtection";
import { ERole } from "../user/user.interface";
import { AppointmentController } from "./appointment.controller";

const router = express.Router();

router.get(
    "/my-appointments",
    roleBasedProtection(ERole.PATIENT, ERole.DOCTOR),
    AppointmentController.getMyAppointment
)

router.post(
    "/",
    roleBasedProtection(ERole.PATIENT),
    AppointmentController.createAppointment
)

router.patch(
    "/status/:id",
    roleBasedProtection(ERole.ADMIN, ERole.DOCTOR),
    AppointmentController.updateAppointmentStatus
)

export const AppointmentRoutes = router;