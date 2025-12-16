import { Request } from "express";
import { prisma } from "../../lib/prisma";
import { uploadToCloudinary } from "../../helper/fileUpload";

const inserIntoDB = async (req: Request) => {
  const file = req.file;

  if (file) {
    const uploadCloudinary = await uploadToCloudinary(file);
    req.body.icon = uploadCloudinary;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllFromDB = async () => {
  return await prisma.specialties.findMany();
};

const deleteFromDB = async (id: string) => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SpecialtiesService = {
  inserIntoDB,
  getAllFromDB,
  deleteFromDB,
};
