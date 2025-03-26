import express from 'express';
import { login, registerDonor, registerFacility} from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HemoBridge!');
});

router.post('/login', login);

router.post('/register/donor', registerDonor);
router.post('/register/facility', registerFacility);

export default router;