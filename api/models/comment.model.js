import mongoose, { Schema } from 'mongoose';

//as a post can have multiple comment and this array can go larger and larger, so its a better way to parent referencing
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
