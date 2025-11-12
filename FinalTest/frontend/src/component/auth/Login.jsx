import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  {AuthContext} from "../context/AuthContext"
import { backendUrl } from "../../App";
const Login = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [rememberMe , setRememberMe ] = useState(false);
 const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e) =>{
  e.preventDefault();
  try{
    const res = await axios.post(`${backendUrl}/api/auth/login`, {email, password});
    const {user, token} = res.data;
  login (user, token);

  if(rememberMe) localStorage.setItem("rememberUser", email);
  else localStorage.removeItem("rememberUser");

  toast.success("🎉 Login Successful!");
  setTimeout(() => {
    navigate("/");
  }, 1500);
    
  }catch(error){
    const msg = error.response?.data?.message || "Login failed!";
      toast.error(msg);

  }
}



  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
    <form onSubmit={handleLogin} className="space-y-5">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:border-orange-500 outline-none"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:border-orange-500 outline-none"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-orange-500"
          />
          <span>Remember me</span>
        </label>

        <a href="/forgot-password" className="text-orange-500 hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
      >
        Login
      </button>
    </form>
    <p className="mt-4 text-center text-sm text-gray-600">
    Don't have an account?{" "}
        <a href="/register" className="text-orange-500 hover:underline">
          Register
        </a>
      </p>
  </div>
);
};

export default Login;
