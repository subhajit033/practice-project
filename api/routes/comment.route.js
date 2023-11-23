import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import { craeteComment } from '../controllers/comment.controller.js';
const router = express.Router({ mergeParams: true });

router.use(protect);
router.post('/', craeteComment);

export default router;
