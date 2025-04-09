import express from 'express';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { FacilityController } from '../base/facility.controller';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { FacilityStaffController } from './facility-staff.controller';

const FacilityStaffRoutes = express.Router();

FacilityStaffRoutes.post("/", validateSession, validateAccess(USER_ROLE.ADMIN), FacilityStaffController.create);

applyAsyncHandler(FacilityStaffRoutes);
export default FacilityStaffRoutes;