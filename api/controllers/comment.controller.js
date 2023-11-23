import APPError from '../utils/appError.js';
import Comment from '../models/comment.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';
const craeteComment = async (req, res, next) => {
  req.body.post = req.params.postId;
  req.body.commentator = req.user.id;
  try {
    const newComment = await Comment.create(req.body);
    sendJsonRes(res, 201, newComment);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};
export { craeteComment };
