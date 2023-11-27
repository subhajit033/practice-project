import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import followingRouter from './routes/following.route.js';
import followerRouter from './routes/followers.route.js';
import APPError from './utils/appError.js';
const app = express();

app.use(morgan('dev'));

//bodyparser
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/followings', followingRouter);
app.use('/api/v1/followers', followerRouter);


app.all('*', (req, res, next)=>{
    return next(new APPError(`No url match to ${req.originalUrl}`, 404))
})
app.use(globalErrorHandler);
export default app;
