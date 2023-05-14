import express from "express";
import { createPost, getAllPosts, getPostById } from "../controller/post.js";

const router = express.Router();

// 각각의 경로와 메서드에 대해 적절한 컨트롤러를 연결합니다.
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);

export default router;
