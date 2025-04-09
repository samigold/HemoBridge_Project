import express from 'express';
import HealthCareFacilityRouter from './health-care-facility/health-care-facility.routes';
import UserManagementRouter from './user-management/user-management.routes';

const BaseRouter = express.Router();

BaseRouter.get('/health', (req, res) => {
    res.status(200).json({ message: 'Welcome to the HemoBridge API' });
});
BaseRouter.use(UserManagementRouter);
BaseRouter.use(HealthCareFacilityRouter);

export default BaseRouter;