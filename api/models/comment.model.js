import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: true,
    },
    commentator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
