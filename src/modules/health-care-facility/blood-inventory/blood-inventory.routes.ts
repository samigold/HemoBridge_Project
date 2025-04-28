import express from 'express';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { BloodInventoryController } from './facility-staff.controller';

const BloodInventoryRoutes = express.Router({ mergeParams: true });

BloodInventoryRoutes.get("/", validateSession, validateAccess(USER_ROLE.ADMIN), BloodInventoryController.fetchAll);

applyAsyncHandler(BloodInventoryRoutes);
export default BloodInventoryRoutes;