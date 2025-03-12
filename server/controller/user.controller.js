import User from "../model/user.Model.js";
import { z } from "zod";
import { HTTPSTATUS } from "../config/https.config.js";
import { signUpSchema, loginSchema } from "../validation/auth.validation.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const signupValidate = signUpSchema.parse(req.body);
    const { firstName, lastName, password, role, phonenumber, email } =
      signupValidate;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "User with this email already exists",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      password,
      role,
      phonenumber,
      email,
    });

    await newUser.save();

    res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({ errors: error.errors });
    }
    next(error);
  }
};

export const refreshAccessToken = asyncHandler(
  async (req, res, next) => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
          message: "No refresh token provided",
        });
      }

      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(HTTPSTATUS.FORBIDDEN).json({
            message: "Invalid or expired refresh token",
          });
        }

        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: "User not found or refresh token mismatch",
          });
        }

        const newAccessToken = user.generateAccessToken();

        res.status(HTTPSTATUS.OK).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      next(error);
    }
  }
);

export const login = asyncHandler(
  async (req, res, next) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;

      // Check if user exists in the database
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
          message: "Invalid email or password",
        });
      }

      // Check if password matches
      const isPasswordValid = await existingUser.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
          message: "Invalid email or password",
        });
      }

      const { accessToken, refreshToken } = await refreshAccessToken(
        existingUser._id
      );

      const loggedInUser = await User.findById(existingUser._id).select(
        "-password -refreshToken"
      );

      const options = {
        expiresIn: "1h",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      const userResponse = {
        id: loggedInUser._id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        role: loggedInUser.role,
        phonenumber: loggedInUser.phonenumber,
      };

      res
        .status(HTTPSTATUS.OK)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          success: true,
          message: "Login successful",
          user: userResponse,
          accessToken,
          refreshToken,
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({ errors: error.errors });
      }
      next(error);
    }
  }
);

export const logout = asyncHandler(
  async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(
        req.user?.userId , {
          $set : {
            refreshToken : null
          },
          new : true
        }
      )

      const options = {
        expiresIn: "1h",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };


      res
        .status(HTTPSTATUS.OK)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }
);
