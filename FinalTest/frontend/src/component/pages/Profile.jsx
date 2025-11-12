import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const backendUrl = import.meta.env.VITE_API_URL;
export default function Profile() {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h3 style={{ color: "red" }}>You are not logged in.</h3>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${backendUrl}/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid #ddd",
          borderRadius: 8,
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
      
        <div
          style={{
            flex: 1,
            padding: 40,
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            minWidth: 250,
          }}
        >
          <img
            src={
              user.avatar ||
              "https://img.pikbest.com/wp/202433/girl-face-illustration-grey-icon-vector_10640005.jpg!w700wp"
            }
            alt={formData.fullName}
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              marginBottom: 15,
              border: "4px solid #fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
          <h3>{formData.fullName || "User"}</h3>
        </div>

        <div
          style={{
            flex: 2,
            padding: 40,
            minWidth: 300,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              style={{ padding: 10, fontSize: 16 }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              placeholder="Email"
              style={{ padding: 10, fontSize: 16, backgroundColor: "#f0f0f0" }}
            />
           
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              marginTop: 20,
              padding: "10px 0",
              fontSize: 16,
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

   
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 30px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
