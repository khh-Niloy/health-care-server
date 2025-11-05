import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.routes";
import { schedulesRouter } from "../modules/schedules/schedules.route";
import { doctorSchedulesRoute } from "../modules/doctorSchedules/doctorSchedules.route";
import { AppointmentRoutes } from "../modules/appointment/appointment.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/schedules",
    route: schedulesRouter,
  },
  {
    path: "/doctor-schedules",
    route: doctorSchedulesRoute,
  },
  {
    path: "/appointments",
    route: AppointmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
