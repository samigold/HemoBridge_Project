import express from 'express';
import { UserController } from './user.controller';

const UserRoutes = express.Router();

UserRoutes.post("/register/care-giver", UserController.registerCareGiver);
UserRoutes.post("/register/donor", UserController.registerDonor);
UserRoutes.post("/register/admin", UserController.registerAdmin);
UserRoutes.post("/register/facility-staff", UserController.registerFacilityStaff);

export default UserRoutes;