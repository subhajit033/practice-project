import APPError from '../utils/appError.js';
import Post from '../models/post.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      select: 'userName avatar'
    });
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

const updatePost = (req, res, next) => {
  
};

export { getPosts, createPost };
