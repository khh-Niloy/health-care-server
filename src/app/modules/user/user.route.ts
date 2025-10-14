import express from "express";
import { userController } from "./user.controller";
import { createPatientZodSchema } from "./user.validation.zod";
import { validateSchema } from "../../middlewares/validateSchema";
import { upload } from "../../helper/fileUpload";
import { roleBasedProtection } from "../../middlewares/roleBasedProtection";
import { ERole } from "./user.interface";

export const userRoutes = express.Router();

userRoutes.post(
  "/create-patient",
  upload.single("file"),
  validateSchema(createPatientZodSchema),
  userController.createPatient
);

userRoutes.get(
  "/all-users",
  roleBasedProtection(ERole.ADMIN, ERole.DOCTOR, ERole.PATIENT),
  userController.getAllUsers
);
