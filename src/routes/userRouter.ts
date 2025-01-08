import Router from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/UserControllers";

const userRouter = Router();

userRouter.post("/users", createUser);

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);

export default userRouter;
