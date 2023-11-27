import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  craeteComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';
const router = express.Router({ mergeParams: true });

router.use(protect);
router.post('/', craeteComment);
router.route('/:commentId').patch(updateComment).delete(deleteComment);

export default router;
