import Router from "express";
import { getUserById, updateUser } from "../controllers/userControllers";
import { verifyUser } from "../middlewares/login-verification";

const userRouter = Router();

// userRouter.post("/users", createUser);

// userRouter.get("/users", getAllUsers);

userRouter.get("/user", verifyUser, getUserById);

userRouter.put("/user", verifyUser, updateUser);

//userRouter.delete("/users/:id", deleteUser);

export default userRouter;
