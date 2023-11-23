import express from 'express';
import morgan from 'morgan';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './routes/user.route.js'
const app = express();

app.use(morgan('dev'));

//bodyparser
app.use(express.json());

app.use((req, res, next)=>{
  console.log('Hello from middleware..');
  next();
})


app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);
export default app;
