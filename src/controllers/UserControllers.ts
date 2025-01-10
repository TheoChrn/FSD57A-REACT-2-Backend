import { RequestWithUser } from "@/middlewares/login-verification";
import { RequestHandler } from "express";
import User from "../models/User";

// export const createUser: RequestHandler = async (req, res) => {
//   const { first_name, last_name } = req.body;
//   try {
//     await User.create(req.body);
//     res
//       .status(200)
//       .json({ message: `User ${first_name} ${last_name} created` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getAllUsers: RequestHandler = async (_, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getUserById: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  const { user_id } = req.user!;
  try {
    const userById = await User.findById({ _id: user_id });
    res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const deleteUser: RequestHandler = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByIdAndDelete({ _id: id });

//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     res.status(200).json({ message: "User deleted sucessfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const updateUser: RequestHandler = async (req: RequestWithUser, res) => {
  const { user_id } = req.user!;
  try {
    await User.updateOne({ _id: user_id }, { $set: { ...req.body } });

    res.status(200).json({ message: "User updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
