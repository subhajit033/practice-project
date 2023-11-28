import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  createFollowings,
  unfollowUser,
  getFollowings,
} from '../controllers/following.controller.js';

const router = express.Router();

router.get('/:userId', getFollowings);

router.use(protect);
router.post('/follow/:userId', createFollowings);
router.post('/unfollow/:userId', unfollowUser);

export default router;
