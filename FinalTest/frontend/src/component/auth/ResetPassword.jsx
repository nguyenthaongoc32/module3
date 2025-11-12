import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email] = useState(location.state?.email || "")
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading ,setLoading] = useState(false);

    const handleResetPassword = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post (`${backendUrl}/api/auth/reset-password-otp`, {
                email,
                otp,
                newPassword,
            });
            toast.success(res.data.message);

            setTimeout(() => {
                navigate("/login");
            },1500);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        };
  return (
    <div style={{ maxWidth: "500px", margin: "100px auto", padding: "30px", background: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center" }}>
    <h2 style={{ color: "#f36602", marginBottom: "10px", fontWeight: "bold" }}>Reset Password</h2>
    <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
      Enter the OTP and your new password.
    </p>
  
    <hr style={{ marginBottom: "20px", border: "none", borderTop: "1px solid #ddd" }} />
  
    {message && <div style={{ marginBottom: "15px", padding: "10px", background: "#d4edda", color: "#155724", borderRadius: "5px" }}>{message}</div>}
    {error && <div style={{ marginBottom: "15px", padding: "10px", background: "#f8d7da", color: "#721c24", borderRadius: "5px" }}>{error}</div>}
  
    <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <input
        type="text"
        placeholder="OTP Code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "12px",
          backgroundColor: "#f36602",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Loading..." : "Reset Password"}
      </button>
    </form>
  
    <p style={{ fontSize: "12px", color: "#777", marginTop: "15px" }}>
      OTP will expire after <strong>5 minutes</strong>. Please check your email.
    </p>
  </div>
  
  )
}

export default ResetPassword
