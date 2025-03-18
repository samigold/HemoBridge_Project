import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to HemoBridge!');
});

router.post('/login', (req, res) => {
    res.send('Login page');
});

router.post('/register', (req, res) => {
    res.send('Register page');
});

export default router;