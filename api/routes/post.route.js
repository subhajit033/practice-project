import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  getPosts,
  createPost,
  uploadPost,
  uploadToClould,
  updatePost,
  deletePost
} from '../controllers/post.controller.js';
import commentRouter from './comment.route.js';
const router = express.Router();
router.use('/:postId/comments', commentRouter);
router
  .route('/')
  .get(getPosts)
  .post(protect, uploadPost, uploadToClould, createPost);

  router.use(protect);
  router.route('/:postId').patch(updatePost).delete(deletePost);
export default router;
