import express from 'express';
import dotenv from 'dotenv';

import authRoute from './routes/authRoute.js';
import logger from './logger/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { dbConn } from './db/dbConn.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package





dotenv.config();
dbConn();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

const corsOptions = {
    origin: 'http://localhost:8000', // Replace with your frontend's URL
    credentials: true, // Allow cookies to be sent with requests
};

app.use(express.json());
app.use(cors()); // Add this line below the app.use(express.json()) line
app.use(cookieParser());

app.use('/auth', authRoute);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the HemoBridge API' });
});

app.use(errorHandler)

app.listen(PORT, HOST, () => {
    logger.info(`Server running on http://${HOST}:${PORT}`);
});