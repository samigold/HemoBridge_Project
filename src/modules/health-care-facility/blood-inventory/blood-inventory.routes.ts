import express from 'express';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { BloodInventoryController } from './facility-staff.controller';

const BloodInventoryRoutes = express.Router({ mergeParams: true });

BloodInventoryRoutes.get("/", validateSession, BloodInventoryController.fetchAll);

// Update inventory routes - require facility staff access
BloodInventoryRoutes.put('/:inventoryId', 
    validateSession, 
    validateAccess(USER_ROLE.FACILITY_STAFF), 
    BloodInventoryController.updateInventory
  );
applyAsyncHandler(BloodInventoryRoutes);
export default BloodInventoryRoutes;