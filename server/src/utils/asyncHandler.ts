import { NextFunction, Request, Response } from "express";

const asyncHandler =
  (
    controllerFn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controllerFn(req, res, next)).catch(next);
  };

export default asyncHandler;
