import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import { authService } from "../services/authService";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.register({ name, email, password });
      
      toast.success("Registration successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100 px-4">
      <div className="bg-red-600 p-8 rounded-xl shadow-md w-full max-w-md text-white">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Join Vastraa</h1>
          <p className="mt-2 text-base">Create your account to get started.</p>
        </header>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-white rounded-lg bg-red-500 placeholder-white text-white"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-white rounded-lg bg-red-500 placeholder-white text-white"
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
              className="w-full px-4 py-2 border border-white rounded-lg bg-red-500 placeholder-white text-white"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-red-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline text-white hover:text-gray-100">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
