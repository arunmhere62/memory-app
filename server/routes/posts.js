import express from "express";
import { createPost, getPosts, getSinglePost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;
