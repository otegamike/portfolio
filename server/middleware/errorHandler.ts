import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
    
  console.log(err.message, " - ", err.statusCode);
  console.log(err);

  res.status(err.statusCode).json({
    status: err.status,
    errorMsg: err.message,
  });

};

export const catchAsync = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

