import express from 'express';
import { protect } from '../controllers/auth.controller';
import { getPosts, createPost } from '../controllers/post.controller.js';
const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
