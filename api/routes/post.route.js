import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import { getPosts, createPost } from '../controllers/post.controller.js';
import commentRouter from './comment.route.js'
const router = express.Router();
router.use('/:postId/comments', commentRouter);
router.route('/').get(getPosts).post(protect, createPost);

export default router;
