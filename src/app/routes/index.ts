import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.routes";
import { schedulesRouter } from "../modules/schedules/schedules.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
