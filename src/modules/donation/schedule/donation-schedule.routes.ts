import express from 'express';
import { DonationScheduleController } from './donation-schedule.controller';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';

const DonationScheduleRouter = express.Router();

DonationScheduleRouter.post('/', validateSession, validateAccess(USER_ROLE.DONOR), DonationScheduleController.create);

export default DonationScheduleRouter;