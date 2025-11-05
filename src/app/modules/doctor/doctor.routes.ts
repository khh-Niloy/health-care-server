import express from "express";
import { ERole } from "../user/user.interface";
import { roleBasedProtection } from "../../middlewares/roleBasedProtection";
import { DoctorController } from "./doctor.controller";
const router = express.Router();

router.get(
    "/",
    DoctorController.getAllFromDB
);

router.post("/suggestion", DoctorController.getAISuggestions);

router.get('/:id', DoctorController.getByIdFromDB);

router.patch(
    "/:id",
    roleBasedProtection(ERole.ADMIN, ERole.DOCTOR),
    DoctorController.updateIntoDB
);

router.delete(
    '/:id',
    roleBasedProtection(ERole.ADMIN),
    DoctorController.deleteFromDB
);

router.delete(
    '/soft/:id',
    roleBasedProtection(ERole.ADMIN),
    DoctorController.softDelete);



export const DoctorRoutes = router;