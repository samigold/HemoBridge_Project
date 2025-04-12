import express from 'express';
import { UserController } from './user.controller';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';

const UserRoutes = express.Router();

UserRoutes.post("/register/care-giver", UserController.registerCareGiver);
UserRoutes.post("/register/donor", UserController.registerDonor);
UserRoutes.post("/register/admin", UserController.registerAdmin);
UserRoutes.post("/register/facility-staff", UserController.registerFacilityStaff);

applyAsyncHandler(UserRoutes);
export default UserRoutes;