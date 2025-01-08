import { Request, Response } from "express";
import Users from "../models/Users";

export const createUser = async (req: Request, res: Response) => {
  const { first_name, last_name } = req.body;
  try {
    await Users.create(req.body);
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
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userById = await Users.findById(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Users.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Users.updateOne({ _id: id }, { $set: { ...req.body } });

    res.status(200).json({ message: "User updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
