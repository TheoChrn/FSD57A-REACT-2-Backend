import Router from "express";
import { createPost, getAllPosts,getPostById,updatePost, deletePost } from "../controllers/postsControllers";

const postRouter = Router();

postRouter.post("/posts", createPost);

postRouter.get("/posts", getAllPosts);

postRouter.get("/posts/:id", getPostById);

postRouter.put("/posts/:id", updatePost);

postRouter.delete("/posts/:id", deletePost);

export default postRouter;
