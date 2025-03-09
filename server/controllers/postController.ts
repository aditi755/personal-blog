import { Request, Response } from "express";
import Post from "../models/Post";
import { AuthRequest } from "../middleware/authMiddleware"; 

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, authorId } = req.body; 

    if (!authorId) {
      res.status(401).json({ message: "Unauthorized: No user ID provided" });
      return;
    }

    const post = new Post({ title, content, authorId });
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().populate("authorId", "email");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getPostsByAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorId } = req.params;

    if (!authorId) {
      res.status(400).json({ message: "Author ID is required." });
      return;
    }

    const posts = await Post.find({ authorId }).populate("authorId", "email");

    if (posts.length === 0) {
      res.status(404).json({ message: "No posts found for this author." });
      return;
    }

    res.json(posts);
  } catch (error) {
    console.error("Error fetching author's posts:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("authorId", "email");

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return; // Ensure function exits after response
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
};