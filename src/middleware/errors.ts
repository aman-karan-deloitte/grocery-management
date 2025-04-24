import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = error.statusCode || 500;
  const errorCode = error.errorCode || 'UNKNOWN_ERROR';
  const errors = error.errors || [];

  res.status(statusCode).json({
    message: error.message,
    errorCode,
    errors,
  });
}