import { NextFunction, Request, Response } from 'express';

const logMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`Method: ${req.method} & Path: ${req.path}`);
  next();
};

export default logMiddleware;
