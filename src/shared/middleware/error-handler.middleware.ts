import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export function errorHandlerMiddleware(
  error: unknown, // use unknown here
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    status: 'ERROR',
    statusCode: 500,
    message: 'Internal Server Error',
  });
}