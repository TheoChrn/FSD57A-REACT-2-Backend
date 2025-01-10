import Router from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postsControllers";
import { verifyUser } from "../middlewares/login-verification";

const postRouter = Router();

postRouter.post("/posts", verifyUser, createPost);

postRouter.get("/posts", verifyUser, getAllPosts);

postRouter.get("/posts/:id", verifyUser, getPostById);

postRouter.put("/posts/:id", verifyUser, updatePost);

postRouter.delete("/posts/:id", verifyUser, deletePost);

export default postRouter;
