import { useState } from 'react';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Send login request to backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      // Save token in localStorage for future requests
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Call onLogin callback (if any)
      onLogin && onLogin();

      // Navigate to /todo page
      navigate('/todo');

    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#A29BFE]/5 via-white to-[#81ECEC]/5">
      <div className="w-full max-w-md relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#A29BFE]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#81ECEC]/10 rounded-full blur-xl"></div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#A29BFE]/20 to-[#81ECEC]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSignInAlt className="text-[#A29BFE] text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-[#2D3436]">Welcome Back</h1>
            <p className="text-[#2D3436]/70 mt-2">Sign in to continue your productivity journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-[#FDCB82]/10 to-[#FDCB82]/5 border border-[#FDCB82]/30 text-[#2D3436] px-4 py-3 rounded-xl mb-6 flex items-start space-x-3">
              <div className="w-6 h-6 bg-[#FDCB82]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#FDCB82] text-sm">!</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Login Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-[#2D3436] mb-2 font-medium text-sm uppercase tracking-wide">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-[#A29BFE] transition-colors group-focus-within:text-[#8a83e5]" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#A29BFE] focus:ring-2 focus:ring-[#A29BFE]/20 outline-none transition-all duration-300 text-[#2D3436] placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[#2D3436] font-medium text-sm uppercase tracking-wide">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#A29BFE] hover:text-[#8a83e5] transition"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-[#A29BFE] transition-colors group-focus-within:text-[#8a83e5]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#A29BFE] focus:ring-2 focus:ring-[#A29BFE]/20 outline-none transition-all duration-300 text-[#2D3436] placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#A29BFE] transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] hover:from-[#8a83e5] hover:to-[#6bdada] text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  <span>Sign In to Your Account</span>
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center pt-4">
            <p className="text-[#2D3436]/70">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-[#A29BFE] hover:text-[#8a83e5] font-semibold transition inline-flex items-center space-x-1 group"
              >
                <span>Create account</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
