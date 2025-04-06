import mongoose from "mongoose";
// import logger from "../logger/logger.js";

export const dbConn = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('An Error occured', error);
        // process.exit(1); //1 means exit with failure, 0 means exit with success
    }
};