import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup function
export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ email, passwordHash });
    await user.save();

    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    next(error); 
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // ✅ Set the token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript access for security
      sameSite: "none", // Helps with CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      path: "/",
      domain: "localhost", // Set your domain
    });

    res.status(200).json({ message: "Login successful" }); // No need to return the token explicitly
  } catch (error) {
    next(error);
  }
};
