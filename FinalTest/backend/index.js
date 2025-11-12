import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import AuthRouter from "./router/authRouter.js"
import NotificationRouter from './router/notificationRouter.js';
import ProductRouter from "./router/productRouter.js"
import UserRouter from "./router/userRouter.js"
dotenv.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use("/api/auth",AuthRouter)
app.use("/api/notifications",NotificationRouter)
app.use("/api/products",ProductRouter)
app.use("/api/users",UserRouter)
app.listen(8080, () => {
    console.log('Server is running!');
});





