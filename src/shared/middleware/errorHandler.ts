import { NextFunction, Request, Response } from "express";
import logger from "src/insfrastructure/logger/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // console.error(err.stack); // Log the error for debuggin
    console.error(err)

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in development
    });
};