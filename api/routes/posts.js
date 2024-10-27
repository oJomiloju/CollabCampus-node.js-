import express from "express";
import { addPost } from "../controllers/post.js";
import { getPost } from "../controllers/post.js";
import { getPosts } from "../controllers/post.js";
import { updatePost } from "../controllers/post.js";
import { deletePost } from "../controllers/post.js";

const router = express.Router()
router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",addPost)
router.put("/:id",deletePost)
router.delete("/:id",updatePost)

export default router;