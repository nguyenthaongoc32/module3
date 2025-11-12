import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../model/authModel.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all information",
      });
    }

    const existingAuth = await AuthModel.findOne({ email });
    if (existingAuth) {
      return res.status(400).json({
        message: "Email has been registered",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await AuthModel.create({
      fullName: name,
      email,
      password: hash,
      role: "CUSTOMER",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Register successful!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[REGISTER] Error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all information",
      });
    }

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[LOGIN] Error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const otpStore = {};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await AuthModel.findOne({ email });
    if (!user) {
      console.log("[SEND OTP] User not found:", email);
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = { otp, expire: Date.now() + 5 * 60 * 1000 };

    console.log("[SEND OTP] OTP generated:", otp, "for", email);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      
    });
    console.log("ENV TEST:", process.env.EMAIL_USER, process.env.EMAIL_PASS);
    await transporter.sendMail({
      from: `"EduPress" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Change EduPress password",
      html: `<p>Your OTP code is: <strong>${otp}</strong>. Expires in 5 minutes.</p>`,
    });

    res.json({ message: "OTP has been emailed" });
  } catch (err) {
    console.error("[SEND OTP] Error:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const resetPasswordWithOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = otpStore[email];
    if (!record) {
      return res.status(400).json({
        message: "OTP does not exist",
      });
    }

    if (record.otp != otp) {
      return res.status(400).json({
        message: "OTP is incorrect",
      });
    }

    if (record.expire < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Password changed successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("[RESET PASSWORD] Error:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
  

};
