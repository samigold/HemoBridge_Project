import express from 'express';
import { FacilityController } from './facility.controller';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { validateAccess } from 'src/shared/middleware/access.middleware';
import { USER_ROLE } from 'src/shared/constants/user-role.enum';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';

const FacilityRoutes = express.Router();

FacilityRoutes.post("/", validateSession, validateAccess(USER_ROLE.ADMIN), (req, res)=> FacilityController.create(req, res));
FacilityRoutes.get("/:page", validateSession, (req, res)=> FacilityController.fetch(req, res));
FacilityRoutes.get("/:id", validateSession, (req, res)=> FacilityController.fetchById(req, res));

applyAsyncHandler(FacilityRoutes)
export default FacilityRoutes;