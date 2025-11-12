import express from 'express';
import mongoose from 'mongoose';
import teacherRoute from './router/teacherRouter.js'

const app = express();
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
app.use(cors());

app.use('/api/teachers' , teacherRoute)
mongoose.connect(process.env.DATABASE_URL);
app.listen(8080, () => {
    console.log('Server is running!');
});