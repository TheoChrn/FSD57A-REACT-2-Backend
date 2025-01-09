import User from "../models/User";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const emailVerification = await User.findOne({ email });
    if (emailVerification) {
      res.status(409).json({ message: "This email is already taken" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({ ...req.body, password: hashedPassword });

    res.status(200).json({ message: "Welcome" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Interval server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(409).json({ message: "Email or password invalid" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(409).json({ message: "Email or password invalid" });
      return;
    }
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET!);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internval server error" });
  }
};
