import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name } = req.body;
  try {
    await User.create(req.body);
    res
      .status(200)
      .json({ message: `User ${first_name} ${last_name} created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userById = await User.findById(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.updateOne({ _id: id }, { $set: { ...req.body } });

    res.status(200).json({ message: "User updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
