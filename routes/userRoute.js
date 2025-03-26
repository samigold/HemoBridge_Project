import express from 'express';
import { authorize } from '../middleware/authorize';

const router = express.Router();

// User Management Routes
// router.get('/users', authorize, checkRole(['admin']), UserController.getAllUsers);  // get all users (admin only)
router.get('/users/:userId', authMiddleware, UserController.getUserById); // get user by id (admin, user)
router.put('/users/:userId', authMiddleware, UserController.updateUser); // update user by id (admin, user)
router.delete('/users/:userId', authMiddleware, checkRole(['admin']), UserController.deleteUser);
router.put('/users/:userId/status', authMiddleware, checkRole(['admin']), UserController.updateUserStatus);


export default router;