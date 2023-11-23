import mongoose, { Schema } from 'mongoose';

const followingSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  following: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Following = mongoose.model('Following', followingSchema);
export default Following;
