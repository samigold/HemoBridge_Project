import express from 'express';
import { DonationScheduleController } from './donation-schedule.controller';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';

const DonationScheduleRouter = express.Router();

// Donor routes
DonationScheduleRouter.get('/donor', validateSession, validateAccess(USER_ROLE.DONOR), DonationScheduleController.fetchDonorSchedules);
DonationScheduleRouter.post('/', validateSession, validateAccess(USER_ROLE.DONOR), DonationScheduleController.create);

// Facility routes
DonationScheduleRouter.get('/facility', validateSession, validateAccess(USER_ROLE.FACILITY_STAFF), DonationScheduleController.fetchFacilitySchedules);

export default DonationScheduleRouter;