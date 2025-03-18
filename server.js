import express from 'express';
import dotenv from 'dotenv';

import authRoute from './routes/authRoute.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

const app = express();

app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.send('Wellcome to HemoBridge!');
});


app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});