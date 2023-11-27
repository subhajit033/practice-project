import APPError from '../utils/appError.js';
import Following from '../models/following.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';

const createFollowings = async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.following = req.params.userId;
  try {
    const newFollowing = await Following.create(req.body);
    sendJsonRes(res, 201, newFollowing);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    const unfollow = await Following.findOneAndDelete({
      user: req.user.id,
      following: req.params.userId,
    });
    sendJsonRes(res, 200, null);
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};

const getFollowings = async (req, res, next) => {
  try {
    const followings = await Following.find({
      user: req.params.userId,
    }).populate({
      path: 'following',
      select: 'userName avatar',
    });
    sendJsonRes(res, 200, followings, { length: followings.length });
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};
export { createFollowings, unfollowUser, getFollowings };
