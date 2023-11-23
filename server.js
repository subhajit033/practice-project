import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: './config.env' });
import app from './api/app.js';

const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succesfull'))
  .catch((err) => console.log('DB connection failed .. ' + err));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})