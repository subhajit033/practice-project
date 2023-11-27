import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A post must have an owner'],
    },
    url: {
      type: String,
      required: [true, 'a post must have content'],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

export default Post;
