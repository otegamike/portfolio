import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';
import { catchAsync } from './errorHandler.js';
import jwt from 'jsonwebtoken'

export const validateAdmin = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const acesstoken = req.headers.authorization;
    if (!acesstoken) {
        throw new AppError("acesstoken is required", 401);
    }
    const token = acesstoken.split(" ")[1];
    if (!token) {
        throw new AppError("token is required", 401);
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
        throw new AppError("jwt secret not found", 500);
    }
    
    const decodedToken = jwt.verify(token, jwtSecret);
    
    next();
})