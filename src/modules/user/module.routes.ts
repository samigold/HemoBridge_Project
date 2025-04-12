import express from 'express';
import UserRoutes from "./base/user.routes";
import AuthRoutes from "./auth/auth.routes"
import ProfileRoutes from './profile/profile.routes';

const UserModuleRouter = express.Router();

UserModuleRouter.use('/users', UserRoutes);
UserModuleRouter.use('/auth', AuthRoutes);
UserModuleRouter.use('/profile', ProfileRoutes);


export default UserModuleRouter;