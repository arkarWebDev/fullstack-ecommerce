import { Request, Response } from "express";
import { User } from "../models/user";
import asyncHandler from "../utils/asyncHandler";
import generateToken from "../utils/generateToken";

// @route POST | api/register
// @desc Register new user
// @access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exist with this email address.");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    }
  }
);

// @route POST | api/login
// @desc Login to existing user's account.
// @access Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser && (await existingUser.matchPassword(password))) {
    generateToken(res, existingUser._id);
    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    });
  } else {
    res.status(401);
    throw new Error("User not found with this credentials.");
  }
});

// @route POST | api/logout
// @desc Clear token.
// @access Public
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "logout!!" });
});
