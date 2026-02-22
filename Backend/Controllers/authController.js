import User from "../Models/User.js";
import ApiError from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/generateToken.js";
import { generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new ApiError("User already exists", 409);
  }
  const user = await User.create({ name, email, password, phone });
  return res.status(201).json({
    success: true,
    message: "User created successfuly!",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  if (!user.isActive) {
    throw new ApiError(
      "Your account has been deactivated. Please contact admin.",
      403,
    );
  }

  const checkPassword = await user.comparePassword(password);

  if (!checkPassword) {
    throw new ApiError("Invalid email or password", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      accessToken,
    },
  });
};

export const refreshTokenMethod = async (req, res) => {
  const refreshToken=req.cookies.refreshToken;
  if(!refreshToken){
    throw new ApiError("Token not present",401);
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new ApiError("Invalid refresh Token", 401);
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError("Invalid or expired refresh token", 401);
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      accessToken,
    },
  });
};
