import express from 'express';
import UserRoutes from './user-management/user/user.routes';
import AuthRoutes from './user-management/auth/auth.routes';

const BaseRouter = express.Router();

BaseRouter.get('/health', (req, res) => {
    res.status(200).json({ message: 'Welcome to the HemoBridge API' });
});
BaseRouter.use("/users", UserRoutes);
BaseRouter.use("/auth", AuthRoutes);


export default BaseRouter;