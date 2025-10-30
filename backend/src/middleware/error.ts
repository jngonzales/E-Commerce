import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error details
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    statusCode,
  });
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  logger.warn(`404 - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(404);
  next(error);
};
