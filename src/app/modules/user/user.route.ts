import express from 'express';
import { userController } from './user.controller';
import { createPatientZodSchema } from './user.validation.zod';
import { validateSchema } from '../../middlewares/validateSchema';
import { upload } from '../../helper/fileUpload';

export const userRoutes = express.Router()

userRoutes.post("/create-patient", upload.single("file"), validateSchema(createPatientZodSchema), userController.createPatient)