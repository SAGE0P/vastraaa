import React, { useState, useEffect } from "react";
import Myorder from "./Myorder";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { authService } from "../services/authService";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }
    
    // Fetch user profile
    fetchUserProfile();
  }, [navigate]);
  
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await authService.getProfile();
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user profile');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    toast.success('Logged out successfully');
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        {/* User Info */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <div>
              <p className="text-gray-600">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Account created: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-gray-600">Not logged in</p>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mb-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
        >
          Logout
        </button>

        {/* Orders Section */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <Myorder />
        </div>
      </div>
    </div>
  );
};

export default Profile;
