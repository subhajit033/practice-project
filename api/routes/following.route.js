import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import { createFollowings } from '../controllers/following.controller.js';

const router = express.Router();

router.use(protect);

router.post('/:followingId', createFollowings);

export default router;