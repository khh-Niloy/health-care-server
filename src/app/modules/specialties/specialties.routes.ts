import express from 'express';
import { SpecialtiesValidtaion } from './specialties.validation';
import { roleBasedProtection } from '../../middlewares/roleBasedProtection';
import { ERole } from '../user/user.interface';
import { upload } from '../../helper/fileUpload';
import { SpecialtiesService } from './specialties.service';
import { validateSchema } from '../../middlewares/validateSchema';


const router = express.Router();


// Task 1: Retrieve Specialties Data

/**
- Develop an API endpoint to retrieve all specialties data.
- Implement an HTTP GET endpoint returning specialties in JSON format.
- ENDPOINT: /specialties
*/
router.get(
    '/',
    roleBasedProtection(ERole.ADMIN),
    SpecialtiesService.getAllFromDB
);

router.post(
    '/',
    upload.single('file'),
    validateSchema(SpecialtiesValidtaion.create),
    SpecialtiesService.inserIntoDB
);



// Task 2: Delete Specialties Data by ID

/**
- Develop an API endpoint to delete specialties by ID.
- Implement an HTTP DELETE endpoint accepting the specialty ID.
- Delete the specialty from the database and return a success message.
- ENDPOINT: /specialties/:id
*/

router.delete(
    '/:id',
    roleBasedProtection(ERole.ADMIN),
    SpecialtiesService.deleteFromDB
);

export const SpecialtiesRoutes = router;