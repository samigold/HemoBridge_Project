import express from 'express';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { FacilityStaffController } from './facility-staff.controller';

const FacilityStaffRoutes = express.Router({ mergeParams: true });

FacilityStaffRoutes.get("", validateSession, FacilityStaffController.fetch);

applyAsyncHandler(FacilityStaffRoutes);
export default FacilityStaffRoutes;