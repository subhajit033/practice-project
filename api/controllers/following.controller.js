import APPError from '../utils/appError.js';
import Following from '../models/following.model.js';
import sendJsonRes from '../utils/sendJsonRes.js';

const createFollowings = (req, res, next) => {
  req.body.user = rqe.user.id;
  req.body.following = req.params.followingId;

};
export {createFollowings}
