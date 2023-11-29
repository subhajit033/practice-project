import express from 'express';
import {
  signup,
  login,
  uploadAvatar,
  uploadUserPhoto,
} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', uploadAvatar, uploadUserPhoto, signup);
router.post('/login', login);
router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'success',
  });
});

export default router;
