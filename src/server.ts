import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package
import BaseRouter from './modules/main.routes';
import logger from './insfrastructure/logger/logger';
import { dbConn } from './insfrastructure/db/dbConn';
import "src/shared/events/event.listeners";

dotenv.config();
dbConn();

const app = express();

// const corsOptions = {
//     origin: 'http://localhost:8000', // Replace with your frontend's URL
//     credentials: true, // Allow cookies to be sent with requests
// };

app.use(express.json());
app.use(cors()); // Add this line below the app.use(express.json()) line
app.use(cookieParser());

app.use('', BaseRouter);

// app.use(errorHandler)

app.listen(Number(process.env.PORT) || 8000, process.env.HOST, () => {
    logger.info(`Server running on http://${process.env.HOST}:${process.env.PORT}`);
});