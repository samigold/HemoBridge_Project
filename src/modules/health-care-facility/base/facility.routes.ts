import express from 'express';
import { FacilityController } from './facility.controller';
import { validateSession } from 'src/shared/middleware/validate-session.middleware';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';

const FacilityRoutes = express.Router();

FacilityRoutes.post("/create-from-local-db", (req, res)=> FacilityController.createFromLocalDB(req, res))
FacilityRoutes.get("/:page", validateSession, (req, res)=> FacilityController.fetch(req, res));

FacilityRoutes.post("/", validateSession, (req, res)=> FacilityController.create(req, res));

applyAsyncHandler(FacilityRoutes)
export default FacilityRoutes;