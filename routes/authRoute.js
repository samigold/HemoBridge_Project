import express from 'express';
import { forgotPassword, login, logout, registerDonor, registerFacility, resendVerificationEmail, verifyEmail} from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HemoBridge!');
});

router.post('/login', login);

router.post('/register/donor', registerDonor);
router.post('/register/facility', registerFacility);
router.put('/verify', verifyEmail);
router.put('/resend-verification', resendVerificationEmail);
router.post('/forgotpassword', forgotPassword);



router.post('/logout', logout);

export default router;