import express from 'express';
import FacilityRoutes from './base/facility.routes';
import FacilityStaffRoutes from './facility-staff/facility-staff.routes';
import BloodInventoryRoutes from './blood-inventory/blood-inventory.routes';

const HealthCareFacilityRouter = express.Router();

HealthCareFacilityRouter.use('/facility', FacilityRoutes);
HealthCareFacilityRouter.use('/facility/staff', FacilityStaffRoutes);
HealthCareFacilityRouter.use('/facility/:facilityId/staff', FacilityStaffRoutes);
HealthCareFacilityRouter.use('/facility/:facilityId/inventory', BloodInventoryRoutes);

export default HealthCareFacilityRouter;