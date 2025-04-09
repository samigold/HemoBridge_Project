import express from 'express';
import FacilityRoutes from './base/facility.routes';

const HealthCareFacilityRouter = express.Router();

HealthCareFacilityRouter.use('/facility', FacilityRoutes);

export default HealthCareFacilityRouter;