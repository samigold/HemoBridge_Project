import express from 'express';
import { DonationScheduleController } from './donation-schedule.controller';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';

const DonationScheduleRouter = express.Router();

// Donor routes
DonationScheduleRouter.get('/donor', validateSession, validateAccess(USER_ROLE.DONOR), DonationScheduleController.fetchDonorSchedules);
DonationScheduleRouter.post('/', validateSession, validateAccess(USER_ROLE.DONOR, USER_ROLE.FACILITY_STAFF), DonationScheduleController.create);
DonationScheduleRouter.patch('/:donationScheduleId/assign', validateSession, validateAccess(USER_ROLE.DONOR), DonationScheduleController.assignDonor);

// Facility routes
DonationScheduleRouter.get('/facility', validateSession, validateAccess(USER_ROLE.FACILITY_STAFF), DonationScheduleController.fetchFacilitySchedules);
DonationScheduleRouter.post('/:donationScheduleId/approve', validateSession, validateAccess(USER_ROLE.FACILITY_STAFF), DonationScheduleController.approve);
DonationScheduleRouter.post('/:donationScheduleId/decline', validateSession, validateAccess(USER_ROLE.DONOR,USER_ROLE.FACILITY_STAFF), DonationScheduleController.decline);
DonationScheduleRouter.post('/:donationScheduleId/complete', validateSession, validateAccess(USER_ROLE.FACILITY_STAFF), DonationScheduleController.complete);

applyAsyncHandler(DonationScheduleRouter);
export default DonationScheduleRouter;