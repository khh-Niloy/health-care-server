import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { cookiesManagement } from "../../utils/cookiesManagement";
import { successResponse } from "../../utils/successResponse";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedInUser = await authService.userLoginService(req.body);

    cookiesManagement.setCookies(
      res,
      loggedInUser.accessToken,
      loggedInUser.refreshToken
    );

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "log in successful",
      data: loggedInUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const newAccessToken = await authService.getNewAccessTokenService(
      refreshToken as string
    );

    cookiesManagement.setCookies(res, newAccessToken.newAccessToken);

    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "new accees token created",
      data: newAccessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const userLogOut = async (req: Request, res: Response) => {
  try {
    cookiesManagement.clearCookies(res);

    successResponse(res, {
      statusCode: 201,
      success: true,
      message: "user log out",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const authController = {
  userLogin,
  getNewAccessToken,
  userLogOut,
};
