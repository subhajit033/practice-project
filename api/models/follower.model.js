import mongoose, { Schema } from 'mongoose';

const followersSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  follower: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Follower = mongoose.model('Follower', followersSchema);
export default Follower;
