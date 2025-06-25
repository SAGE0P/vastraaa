import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authService } from "../services/authService";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      
      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4">
      <div className="bg-red-600 p-8 rounded-xl shadow-md w-full max-w-md text-white">

        {/*  Intro Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to Vastraa</h1>
          <p className="mt-2 text-base">
            Login to your account and shop with confidence.
          </p>
        </header>

        {/*  Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-white rounded-lg bg-red-500 placeholder-white text-white focus:ring-2 focus:ring-white"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-white rounded-lg bg-red-500 placeholder-white text-white focus:ring-2 focus:ring-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-red-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
        </form>

        {/*  Register Redirect */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline text-white font-medium hover:text-gray-100">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
