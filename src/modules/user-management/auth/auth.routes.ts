import express from 'express';
import { AuthController } from './auth.controller';
// import AuthController from './auth.controller';

const AuthRoutes = express.Router();

AuthRoutes.get('/', (req, res) => {
    res.send('Welcome to HemoBridge!');
});

AuthRoutes.post('/login', AuthController.login);

// AuthRoutes.post('/register/donor', AuthController.registerDonor);
// AuthRoutes.post('/register/facility', AuthController.registerFacility);
// AuthRoutes.put('/verify', AuthController.verifyEmail);
// AuthRoutes.put('/resend-verification', AuthController.resendVerificationEmail);
// AuthRoutes.post('/forgotpassword', AuthController.forgotPassword);



// AuthRoutes.post('/logout', AuthController.logout);

export default AuthRoutes;