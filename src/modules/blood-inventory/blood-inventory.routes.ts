import express from 'express';
import { BloodInventoryController } from './blood-inventory.controller';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';

const BloodInventoryRouter = express.Router();

// Route to create a new blood inventory record
BloodInventoryRouter.post('/blood-inventory', validateSession, validateAccess(USER_ROLE.FACILITY_STAFF), BloodInventoryController.create);

applyAsyncHandler(BloodInventoryRouter);
export default BloodInventoryRouter;