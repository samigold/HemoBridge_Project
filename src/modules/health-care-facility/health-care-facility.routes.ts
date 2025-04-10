import express from 'express';
import FacilityRoutes from './base/facility.routes';
import FacilityStaffRoutes from './facility-staff/facility-staff.routes';

const HealthCareFacilityRouter = express.Router();

HealthCareFacilityRouter.use('/facility', FacilityRoutes);
HealthCareFacilityRouter.use('/facility/:facilityId/staff', FacilityStaffRoutes);

export default HealthCareFacilityRouter;