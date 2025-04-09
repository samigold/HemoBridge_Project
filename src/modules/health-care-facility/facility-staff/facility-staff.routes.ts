import express from 'express';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { FacilityController } from '../base/facility.controller';

const FacilityRoutes = express.Router();

FacilityRoutes.post("/", validateSession, validateAccess(USER_ROLE.ADMIN), FacilityController.create);

export default FacilityRoutes;