import APPError from '../utils/appError.js';
import Post from '../models/post.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadOnclould } from '../utils/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'user',
        select: 'userName avatar',
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'commentator',
          select: 'userName avatar',
        },
        // select: ''
      })
      .sort('-createdAt');
    sendJsonRes(res, 200, posts, { length: posts.length });
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const createPost = async (req, res, next) => {
  //as it is a protected route so we have to req.user

  req.body.user = req.user.id;
  try {
    const post = await Post.create(req.body);
    sendJsonRes(res, 201, post);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(path.join(__dirname, '..', 'public', 'temp'));
    cb(null, `${path.join(__dirname, '..', 'public', 'temp')}`);
  },
  filename: (req, file, cb) => {
    // console.log(file);
    //file = req.file
    const ext = file.mimetype.split('/')[1];
    req.filename = `user-${req.user.id}-${Date.now()}.${ext}`;
    cb(null, req.filename);
  },
});

const upload = multer({
  storage: multerStorage,
});

const uploadPost = upload.single('post_file');

const uploadToClould = async (req, res, next) => {
  try {
    const postUrl = await uploadOnclould(
      path.join(__dirname, '..', 'public', 'temp', req.filename),
      false
    );
    if (!postUrl) return next(new APPError('Please provide file name', 404));
    req.body.url = postUrl;
  } catch (err) {
    return next(new APPError(err.message, 400));
  }
  next();
};

const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    sendJsonRes(res, 200, updatedPost);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findOneAndDelete(req.params.postId);
    sendJsonRes(res, 204, null);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

export {
  getPosts,
  createPost,
  uploadPost,
  uploadToClould,
  updatePost,
  deletePost,
};
