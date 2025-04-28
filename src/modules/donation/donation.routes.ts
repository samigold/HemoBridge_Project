import express from 'express';
import DonationScheduleRouter from './schedule/donation-schedule.routes';

const DonationRouter = express.Router();

DonationRouter.use('/donation/schedule', DonationScheduleRouter);

export default DonationRouter;