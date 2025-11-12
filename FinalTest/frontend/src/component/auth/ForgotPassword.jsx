import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {backendUrl} from "../../App"
const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);

    const navigate = useNavigate();

    //Countdown OTP
useEffect(() => {
    let timer ;
    if(step ===2 && timeLeft > 0) {
        timer = setInterval(() => setTimeLeft(prev => prev -1), 1000);
    }else if (timeLeft <=0 && step === 2 ) {
        toast.error("OTP has expired. Please resend OTP.");
        setStep(1);
        setTimeLeft(300);
    }
return() => clearInterval(timer);
} ,[step, timeLeft]);

//Step1 : Send OTP

const handleOTP = async (e) =>{
  e.preventDefault();
    setLoading(true);

    try{
        const res = await axios.post (`${backendUrl}/api/auth/send-otp`, {email});
        toast.success(res.data?.message || "OTP sent successfully!");
        setStep(2);
        setTimeLeft(300);
    }catch(err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Error sending OTP");
      } finally {
        setLoading(false);
      }
};

// Step2: Reser Pass

const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
        const res = await axios.post(`${backendUrl}/api/auth/reset-password-otp`, {
            email,
            otp,
            newPassword,
        });
        
        toast.success(res.data?.message || "Password reset successfully!")
        setStep(1);
        setOtp("");
        setNewPassword("");
        setTimeLeft(300);

        setTimeout(() => navigate ("/login") ,1500)
    }catch (err) {
        console.error(err);
        const msg = err.response?.data?.message || "Error changing password";
        setError(msg);
  
        if (msg.includes("OTP has expired")) {
          setStep(1);
          setTimeLeft(300);
        }
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
    <div className="w-full sm:max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">
        Forgot Password
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        {step === 1
          ? "Enter your email to receive an OTP to reset your password."
          : "Enter the OTP sent to your email along with your new password."}
      </p>

      <div className="border-b border-gray-300 mb-4"></div>

      {step === 1 && (
        <form onSubmit={handleOTP} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="text"
            placeholder="OTP Code"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            OTP expires in:{" "}
            <strong>
              {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60}
            </strong>{" "}
            minutes
          </p>
        </form>
      )}
    </div>
  </div>
);
};
export default ForgotPassword
