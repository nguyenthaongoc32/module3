import express from "express";

import {register,login ,sendOtp ,resetPasswordWithOtp} from "../controller/authController.js"
const Router = express.Router()

Router.route("/register").post(register);
Router.route("/login").post(login);

Router.route("/send-otp").post(sendOtp);
Router.route("/reset-password-otp").post(resetPasswordWithOtp)

export default Router