import Router, { Request, Response } from "express";
import Users from "../models/Users";

const userRouter = Router();

userRouter.get("/users", async (_: Request, res: Response) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
