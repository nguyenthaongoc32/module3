import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "CUSTOMER"],
    default: "CUSTOMER",
  },
  phone: { type: String },
  
  // phục vụ reset password qua OTP / token
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }], 
  },
  {
    timestamps: true,
  }
);
const AuthModel = mongoose.model("Auth", authSchema)


export default AuthModel