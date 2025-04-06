import express from 'express';
import { HealthCareFacilityController } from './health-care-facility.controller';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';

const HealthCareFacilityRoutes = express.Router();

HealthCareFacilityRoutes.post("/", validateSession(), validateAccess(USER_ROLE.ADMIN), HealthCareFacilityController.create);

export default HealthCareFacilityRoutes;