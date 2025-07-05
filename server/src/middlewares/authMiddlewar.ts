import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { Types } from "mongoose";

interface User {
  name: string;
  email: string;
  _id: string | Types.ObjectId;
  role: "customer" | "admin";
}

export interface AuthRequest extends Request {
  user?: User;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!decoded) {
        res.status(401);
        throw new Error("Not authorized. Invaild token.");
      }

      req.user = (await User.findById(decoded.userId).select(
        "-password"
      )) as User;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized. Invaild token.");
    }
  }
);

export const isAdmin = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
      res.status(401);
      throw new Error("Not authorized. You are not an admin.");
    }
    next();
  }
);
