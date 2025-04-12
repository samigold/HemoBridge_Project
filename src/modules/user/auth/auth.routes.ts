import express from 'express';
import { AuthController } from './auth.controller';
import { applyAsyncHandler } from 'src/shared/middleware/async-handler.middleware';
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
applyAsyncHandler(AuthRoutes);
export default AuthRoutes;