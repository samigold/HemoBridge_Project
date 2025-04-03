import express from 'express';
import { UserController } from './user.controller';
// import { authorize } from '../middleware/authorize';

const UserRoutes = express.Router();

UserRoutes.post("/register/donor", UserController.registerDonor);
UserRoutes.post("/register/admin", UserController.registerAdmin);

// User Management Routes
// router.get('/users', authorize, checkRole(['admin']), UserController.getAllUsers);  // get all users (admin only)
// UserRoutes.get('/users/:userId', authMiddleware, UserController.getUserById); // get user by id (admin, user)
// UserRoutes.put('/users/:userId', authMiddleware, UserController.updateUser); // update user by id (admin, user)
// UserRoutes.delete('/users/:userId', authMiddleware, checkRole(['admin']), UserController.deleteUser);
// UserRoutes.put('/users/:userId/status', authMiddleware, checkRole(['admin']), UserController.updateUserStatus);

export default UserRoutes;