import { RequestHandler } from "express";
import Post from "../models/Post";
import { RequestWithUser } from "@/middlewares/login-verification";

export const getAllPosts: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const { user_id } = req.user!;
    const posts = await Post.find({ userId: user_id }).populate("userId");
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost: RequestHandler = async (req: RequestWithUser, res) => {
  const { title } = req.body;
  const { user_id } = req.user!;

  try {
    await Post.create({ ...req.body, userId: user_id });
    res.status(200).json({ message: `Post ${title} created` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await Post.findById(id).populate("userId");
    res.status(200).json(postById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete({ _id: id });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json({ message: "Post deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.updateOne({ _id: id }, { $set: { ...req.body } });

    res.status(200).json({ message: "Post updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
