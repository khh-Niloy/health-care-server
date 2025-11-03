import { Prisma } from "@prisma/client";
import { uploadToCloudinary } from "../../helper/fileUpload";
import { prisma } from "../../lib/prisma";
import { passwordService } from "../../utils/passwordService";
import pick from "../../utils/pick";
import { ERole, ICreatePatient } from "./user.interface";

const createPatientService = async (
  payload: ICreatePatient,
  file: Express.Multer.File
) => {
  try {
    if (file) {
      const uploadResult = await uploadToCloudinary(file);
      payload.profilePhoto = uploadResult;
    }

    const { password, ...restPayload } = payload;

    const hashPassword = await passwordService.hashPassword(password as string);
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

const getAllUsersService = async (query: Record<string, string>) => {
  const filter = pick(query, ["role", "email", "status", "searchTerm"]);
  const options = pick(query, ["page", "limit", "sortBy", "sortOrder"]);

  const andCondition: Prisma.UserWhereInput[] = [];

  const { searchTerm, ...filterData } = filter;

  if (searchTerm) {
    // OR: [
    //   { email: { contains: "admin", mode: "insensitive" } },
    //   { role: { contains: "admin", mode: "insensitive" } }
    // ]
    andCondition.push({
      OR: ["email"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    // AND: [
    //   { status: { equals: "active" } }
    // ],
    andCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: filterData[field],
        },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput =
    Object.keys(andCondition).length > 0 ? { AND: andCondition } : {};

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "asc";

  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const allUsers = await prisma.user.findMany({
    skip: skip,
    take: limit,
    where: whereCondition,
    // {
    //   AND: [
    //     { OR: [ ... ] },   // search term
    //     { AND: [ ... ] }   // filterData
    //   ]
    // }
    orderBy: { [sortBy]: sortOrder },
  });

  // Suppose 37 users match the filters
  // console.log(allUsers.length); // 10 → users returned for this page
  // console.log(total); // 37 → total matching users across all pages

  const total = await prisma.user.count({
    where: whereCondition,
  });

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: allUsers,
  };
};

const createDoctorService = async (
  payload: any,
  file: Express.Multer.File
) => {
  if (file) {
    const uploadResult = await uploadToCloudinary(file);
    payload.profilePhoto = uploadResult;
  }

  const { password, ...restPayload } = payload;

  const hashPassword = await passwordService.hashPassword(password as string);
  const userPayload = {
    email: payload.email,
    password: hashPassword,
    role: ERole.DOCTOR,
  };

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: userPayload,
    });

    return await tnx.doctor.create({
      data: restPayload,
    });
  });

  return result;
};

export const userService = {
  createPatientService,
  getAllUsersService,
  createDoctorService,
};
