import express from "express";
import { createPost, getPosts, getPostsByAuthor, getPostById } from "../controllers/postController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

// Protected route: Only logged-in users can create a post
router.post("/", createPost);

// Public route: Anyone can fetch posts
router.get("/", getPosts);
router.get("/author/:authorId", getPostsByAuthor);


// Get a single post by ID (public)
router.get("/:id", getPostById);

export default router;
