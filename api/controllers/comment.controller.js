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

const updateComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateComment) {
      return next(new APPError('No comment found', 404));
    }
    sendJsonRes(res, 200, updatedComment);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment) {
      return next(new APPError('No comment found', 404));
    }
    sendJsonRes(res, 204, null);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};
export { craeteComment, updateComment, deleteComment };
