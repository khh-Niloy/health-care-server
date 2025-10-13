import { prisma } from "../lib/prisma";
import { envVars } from "../middlewares/env";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createAccessAndRefreshToken = (jwtPayload: JwtPayload) => {
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return { accessToken, refreshToken };
};


export const getNewAccessTokenFromRefreshToken = async (
    refreshToken: string
  ) => {
    const userInfoFromRefreshToken = verifyToken(
      refreshToken,
      envVars.JWT_REFRESH_SECRET
    );
  
    if (!userInfoFromRefreshToken) {
      throw new Error("refresh token does not exist");
    }

    const user = await prisma.user.findUnique({
        where: {id: (userInfoFromRefreshToken as JwtPayload).userId}
    })
  
    if (!user) {
      throw new Error("user does not exist");
    }
  
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
  
    const accessToken = generateToken(
      jwtPayload,
      envVars.JWT_ACCESS_SECRET,
      envVars.JWT_ACCESS_EXPIRES
    );
  
    return {
      newAccessToken: accessToken,
      user: user,
    };
  };

export const generateToken = (
  jwtPayload: JwtPayload,
  jwtSecret: string,
  jwtExpiresIn: string
) => {
  const accessToken = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: jwtExpiresIn,
  } as SignOptions);
  return accessToken;
};

export const verifyToken = (accessTokenPayLoad: string, jwtSecret: string) => {
  const accessToken = jwt.verify(accessTokenPayLoad, jwtSecret);
  return accessToken;
};

export const tokenService = {
  generateToken,
  verifyToken,
  createAccessAndRefreshToken,
  getNewAccessTokenFromRefreshToken
};
