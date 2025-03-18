import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HemoBridge!');
});

router.get('/login', (req, res) => {
    res.send('Login page');
});

router.get('/register', (req, res) => {
    res.send('Register page');
});

export default router;