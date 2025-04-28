import express from 'express';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { BloodInventoryController } from './facility-staff.controller';

const BloodInventoryRoutes = express.Router({ mergeParams: true });

BloodInventoryRoutes.get("/", validateSession, BloodInventoryController.fetchAll);

applyAsyncHandler(BloodInventoryRoutes);
export default BloodInventoryRoutes;