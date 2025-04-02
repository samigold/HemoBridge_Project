import express from 'express';
import { authorize } from '../middleware/authorize.js';

const router = express.Router();

import { getAllFacilities } from '../controllers/facilityController.js';

router.get('/', authorize, getAllFacilities);

export default router;