import express from "express";
import { getFeedPosts, getUserPosts, likePost, getPositivePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);
router.get('/positive/positive', verifyToken, getPositivePosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;