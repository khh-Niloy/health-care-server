import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { envVars } from "./env";
import { tokenService } from "../utils/tokenService";
import { prisma } from "../lib/prisma";
import { EUserStatus } from "../modules/user/user.interface";

export const roleBasedProtection =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken

      if (!accessToken) {
        throw new Error("access token not found!");
      }

      const userInfoJWTAccessToken = tokenService.verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { email: userInfoJWTAccessToken.email },
      });

      if (!user) {
        throw new Error("user found!");
      }

      if (
        user?.status === EUserStatus.INACTIVE ||
        user?.status === EUserStatus.DELETED
      ) {
        throw new Error(`user is ${user?.status}!`);
      }

      if (!Object.values(roles).includes(userInfoJWTAccessToken.role)) {
        throw new Error("You are not permitted to view this route!!!");
      }

      req.user = userInfoJWTAccessToken;

      next();
    } catch (error) {
      next(error);
    }
  };
