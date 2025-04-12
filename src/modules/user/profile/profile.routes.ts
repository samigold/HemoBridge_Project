import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { ProfileController } from './profile.controller';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { Router } from 'express';

const ProfileRoutes = Router();

ProfileRoutes.get("/", validateSession, ProfileController.getMyProfile);

applyAsyncHandler(ProfileRoutes);
export default ProfileRoutes;