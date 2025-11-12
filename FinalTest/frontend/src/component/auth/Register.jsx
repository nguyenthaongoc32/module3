import React ,{useState, useContext}from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'
const Register = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const validateForm = () =>{
        if(!email ||!userName ||!password ||!confirmPassword){
            toast.error("All fields are required!");
            return false;
        }
        if(!/\S+@\S+\.\S+/.test(email)){
            toast.error("Invalid email format!");
            return false
        }
        if(password.length <6 ){
            toast.error("Password must be at least 6 characters!")
            return false;
        }
        if(password !== confirmPassword) {
            toast.error("Password do not match!");
            return false
        }
        return true;
    };
    console.log("Backend URL:", backendUrl);
    const handleRegister = async (e) =>{
        e.preventDefault();
        if(!validateForm()) return;
        setLoading(true);

        try{
            const res = await axios.post (`${backendUrl}/api/auth/register`, {
                name: userName,
                email,
                password,
            });
            toast.success("🎉 Registration successful!");
            login(res.data.user, res.data.token);
            setTimeout(() => {
                navigate("/login");
              }, 1500);
            } catch (error) {
              console.log(error.response)
              
              toast.error(error.response?.data?.message || "Registration failed.");
            } finally {
              setLoading(false);
            }
          };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
    <form onSubmit={handleRegister} className="space-y-5">
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:border-orange-500 outline-none"
        required
      />

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

      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:border-orange-500 outline-none"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showConfirm ? "🙈" : "👁️"}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  </div>
);
};

export default Register
