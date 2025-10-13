import { uploadToCloudinary } from "../../helper/fileUpload";
import { prisma } from "../../lib/prisma";
import { passwordService } from "../../utils/passwordService";
import { ICreatePatient } from "./user.interface";

const createPatientService = async (
  payload: ICreatePatient,
  file: Express.Multer.File
) => {
  try {
    if (file) {
      const uploadResult = await uploadToCloudinary(file);
      payload.profilePhoto = uploadResult;
    }

    const { password, ...restPayload } = payload

    const hashPassword = await passwordService.hashPassword(
        password as string
    );
    const userPayload = {
      email: payload.email,
      password: hashPassword,
    };

    const result = await prisma.$transaction(async (tnx) => {
      await tnx.user.create({
        data: userPayload,
      });

      return await tnx.patient.create({
        data: restPayload,
      });
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const userService = {
  createPatientService,
};
