import { Response, Request } from "express";
import Post from "../models/Post"
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("userId");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    await Post.create(req.body);
    res.status(200).json({ message: `Post ${title} created` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const postById = await Post.findById(id).populate("userId");
    res.status(200).json(postById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
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

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Post.updateOne({ _id: id }, { $set: { ...req.body } });

    res.status(200).json({ message: "Post updated sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
