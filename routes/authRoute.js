import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HemoBridge!');
});

router.post('/login', login);

router.post('/register', register);

export default router;