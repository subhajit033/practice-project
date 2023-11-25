import express from 'express';
import { getFollowers } from '../controllers/follower.controller.js';
import { protect } from '../controllers/auth.controller.js';
const router = express.Router();

router.use(protect);
router.get('/:userId', getFollowers);

export default router;
