import { Request, Response } from "express";
import { User } from "../models/user";
import asyncHandler from "../utils/asyncHandler";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/authMiddlewar";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";

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

// @route POST | api/upload
// desc update or upload user avatar
// @access Private
export const uploadAvatar = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { image_url } = req.body;

    const userDoc = await User.findById(user?._id);

    if (userDoc?.avatar?.url) {
      await deleteImage(userDoc.avatar.public_alt);
    }

    const response = await uploadSingleImage(image_url, "fash.com/avatar");

    await User.findByIdAndUpdate(user?._id, {
      avatar: {
        url: response.image_url,
        public_alt: response.public_alt,
      },
    });

    res.status(200).json({ message: "Avatar Uploaded." });
  }
);

// @route GET | api/me
// desc Get login user's infomation
// @access Private
export const getUserInfo = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    const userDoc = await User.findById(user?._id).select("-password");

    res.status(200).json(userDoc);
  }
);

// @route POST | api/update-email
// desc Update user's email
// @access Private
export const updateEmailAddress = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { email } = req.body;

    const existingEmailUser = await User.findOne({
      email,
    });

    if (existingEmailUser) {
      throw new Error("Email is already owned by other users.");
    }

    await User.findByIdAndUpdate(user?._id, {
      email,
    });

    res.status(200).json({ message: "User email updated." });
  }
);

// @route POST | api/update-name
// desc Update user's name
// @access Private
export const updateName = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { name } = req.body;

    await User.findByIdAndUpdate(user?._id, {
      name,
    });

    res.status(200).json({ message: "Profile name updated." });
  }
);
