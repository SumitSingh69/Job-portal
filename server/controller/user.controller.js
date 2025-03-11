import User from "../model/user.Model.js";
import { z } from 'zod';
// import { upload, cloudinary } from "../config/cloudinary.config.js";
import { mongoose } from "mongoose"
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const signUpSchema = z.object({
  firstName: z.string().min(2).max(39),
  lastName: z.string().min(2).max(39),
  username: z.string().min(2).max(40),
  password: z.string().min(8).max(20).regex(/^[A-Z]/).regex(/[!@#$%^&*:"?><]/).regex(/\d/),
  role: z.string().optional(),
  phonenumber: z.string(),
  email: z.string().email()

});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20).regex(/^[A-Z]/).regex(/[!@#$%^&*:"?>]/).regex(/\d/)
});

export const signUp = async (req, res, next) => {
  try {

    const signupValidate = signUpSchema.parse(req.body);

    const {
      firstName,
      lastName,
      username,
      password,
      role,
      phonenumber,
      email,
    } = signupValidate;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      password,
      role,
      phonenumber,
      email,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.userId = existingUser._id;
    req.session.userLoggedIn = true;
    req.session.userRole = existingUser.role;

    const userResponse = {
      id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      role: existingUser.role,
      phonenumber: existingUser.phonenumber,
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const updateUser = [isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }

      try {
        const updateData = { ...req.body };
        delete updateData.id;

        if (req.file) {
          updateData.image = req.file.path;
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }

        // if (existingUser.image && req.file) {
        //   try {
        //     const publicId = existingUser.image.split('/').pop().split('.')[0];
        //     // await cloudinary.uploader.destroy(`User-Images/${publicId}`);
        //   } catch (deleteError) {
        //     console.error("Error deleting old image:", deleteError);
        //   }
        // }

        const updatedUser = await User.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );

        res.status(200).json({
          success: true,
          message: 'User updated successfully',
          user: updatedUser
        });
      } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({
          success: false,
          error: error.message || "Internal server error"
        });
      }
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
}];

export const deleteUser = [isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}];