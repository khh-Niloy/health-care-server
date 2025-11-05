import { prisma } from "../../lib/prisma";
import ApiError from "../../middlewares/ApiError";
import { passwordService } from "../../utils/passwordService";
import { tokenService } from "../../utils/tokenService";
import httpStatus from "http-status";

const userLoginService = async (playLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = playLoad;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: email },
  });

  if (!user) {
    throw new Error("Please register first");
  }

  console.log(user);

  // if (user?.isDeleted) {
  //   throw new Error("user is deleted!");
  // }

  const checkPassword = await passwordService.verifyPassword(
    password,
    user.password
  );

  if (!checkPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "password did not match!");
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const { accessToken, refreshToken } =
    tokenService.createAccessAndRefreshToken(jwtPayload);

  return { accessToken, refreshToken, user: user };
};

const getNewAccessTokenService = async (refreshToken: string) => {
  const newAccessstoken = tokenService.getNewAccessTokenFromRefreshToken(refreshToken);
  return newAccessstoken;
};

export const authService = {
  userLoginService,
  getNewAccessTokenService,
};
