import express from 'express';
import { userController } from './user.controller';

export const userRoutes = express.Router()

userRoutes.post("/create-patient", userController.createPatient)