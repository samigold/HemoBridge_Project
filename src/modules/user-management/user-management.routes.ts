import express from 'express';
import UserRoutes from "./user/user.routes";
import AuthRoutes from "./auth/auth.routes"

const UserManagementRouter = express.Router();

UserManagementRouter.use('/users', UserRoutes);
UserManagementRouter.use('/auth', AuthRoutes);


export default UserManagementRouter;