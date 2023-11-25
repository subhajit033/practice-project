import APPError from '../utils/appError.js';
import Following from '../models/following.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';

const getFollowers = async (req, res, next) => {
  try {
    const followers = await Following.find({ following: req.params.userId }).populate({
        path:'user',
        select: 'userName avatar'
    });
    sendJsonRes(res, 200, followers, { length: followers.length });
  } catch (err) {
    next(new APPError(err.message, 400));
  }
};
export { getFollowers };
