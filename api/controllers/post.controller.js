import APPError from '../utils/appError.js';
import Post from '../models/post.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';
import multer from 'multer';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
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
      .sort('createdAt');
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
    cb(null, `${path.join(__dirname, '..', 'public', 'temp')}`);
  },
  filename: (req, file, cb) => {
    console.log(file);
    //file = req.file
    const ext = file.mimetype.split('/')[1];
    req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;
    cb(null, req.file.filename);
  },
});

const upload = multer({
  storage: multerStorage,
});

const uploadPost = upload.single('post_file');

const updatePost = (req, res, next) => {};

export { getPosts, createPost, uploadPost };
