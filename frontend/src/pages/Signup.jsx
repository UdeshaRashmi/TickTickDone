import { useState } from 'react';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    match: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update password criteria
    if (name === 'password') {
      setPasswordCriteria({
        ...passwordCriteria,
        length: value.length >= 6
      });
    } else if (name === 'confirmPassword') {
      setPasswordCriteria({
        ...passwordCriteria,
        match: value === formData.password
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Successful signup
    onLogin();
    navigate('/todo');
  };

  const PasswordCriteriaItem = ({ met, text }) => (
    <li className="flex items-center space-x-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${met ? 'bg-[#81ECEC]' : 'bg-gray-200'}`}>
        {met && <FaCheck className="text-white text-xs" />}
      </div>
      <span className={`text-sm ${met ? 'text-[#2D3436]' : 'text-[#2D3436]/50'}`}>{text}</span>
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#A29BFE]/5 via-white to-[#81ECEC]/5 py-8">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-5 w-40 h-40 bg-[#A29BFE]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 bg-[#FDCB82]/10 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] p-6 text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <FaUserPlus className="text-white text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-white/90 mt-2">Join thousands organizing their tasks with TickTickDone</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-gradient-to-r from-[#FDCB82]/10 to-[#FDCB82]/5 border border-[#FDCB82]/30 text-[#2D3436] px-4 py-3 rounded-xl mb-6 flex items-start space-x-3 animate-shake">
                <div className="w-6 h-6 bg-[#FDCB82]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#FDCB82] text-sm">!</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Please check your information</p>
                  <p className="text-sm opacity-90">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-[#2D3436] mb-2 font-medium text-sm uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-[#A29BFE] transition-colors group-focus-within:text-[#8a83e5]" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#A29BFE] focus:ring-2 focus:ring-[#A29BFE]/20 outline-none transition-all duration-300 text-[#2D3436] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-[#2D3436] mb-2 font-medium text-sm uppercase tracking-wide">Email Address</label>
                <div className="relative">
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

              {/* Password Field */}
              <div className="group">
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-[#A29BFE] transition-colors group-focus-within:text-[#8a83e5]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
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
                
                {/* Password Criteria */}
                <div className="mt-3">
                  <ul className="space-y-2">
                    <PasswordCriteriaItem 
                      met={passwordCriteria.length} 
                      text="At least 6 characters" 
                    />
                    <PasswordCriteriaItem 
                      met={passwordCriteria.match && formData.confirmPassword.length > 0} 
                      text="Passwords match" 
                    />
                  </ul>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[#2D3436] font-medium text-sm uppercase tracking-wide">Confirm Password</label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-xs text-[#A29BFE] hover:text-[#8a83e5] transition"
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className={`transition-colors ${formData.confirmPassword && passwordCriteria.match ? 'text-[#81ECEC]' : 'text-[#A29BFE]'}`} />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-12 pr-12 py-3 bg-white border-2 rounded-xl focus:ring-2 outline-none transition-all duration-300 text-[#2D3436] placeholder-gray-400 ${
                      formData.confirmPassword 
                        ? passwordCriteria.match 
                          ? 'border-[#81ECEC] focus:border-[#81ECEC] focus:ring-[#81ECEC]/20' 
                          : 'border-[#FDCB82] focus:border-[#FDCB82] focus:ring-[#FDCB82]/20'
                        : 'border-gray-200 focus:border-[#A29BFE] focus:ring-[#A29BFE]/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#A29BFE] transition"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  
                  {/* Match indicator */}
                  {formData.confirmPassword && (
                    <div className={`absolute right-10 top-3 w-6 h-6 rounded-full flex items-center justify-center ${
                      passwordCriteria.match ? 'bg-[#81ECEC]/20' : 'bg-[#FDCB82]/20'
                    }`}>
                      {passwordCriteria.match ? (
                        <FaCheck className="text-[#81ECEC] text-xs" />
                      ) : (
                        <span className="text-[#FDCB82] text-xs">!</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3 p-4 bg-[#A29BFE]/5 rounded-xl">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-[#A29BFE] rounded border-gray-300 focus:ring-[#A29BFE]/20"
                  required
                />
                <label htmlFor="terms" className="text-sm text-[#2D3436]/70 leading-tight">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#A29BFE] hover:text-[#8a83e5] font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-[#A29BFE] hover:text-[#8a83e5] font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] hover:from-[#8a83e5] hover:to-[#6bdada] text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating your account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <FaUserPlus />
                    <span className="text-lg">Create Your Free Account</span>
                  </div>
                )}
              </button>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#2D3436]/50">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center space-x-2 text-[#2D3436]/70 hover:text-[#A29BFE] transition group"
                >
                  <FaLock className="text-[#A29BFE] text-sm" />
                  <span>Sign in to your existing account</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </form>
          </div>

          {/* Color accent bar */}
          <div className="px-8 pb-6">
            <div className="flex justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#A29BFE] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#2D3436]/50">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FDCB82] rounded-full animate-pulse delay-75"></div>
                <span className="text-xs text-[#2D3436]/50">Simple</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#81ECEC] rounded-full animate-pulse delay-150"></div>
                <span className="text-xs text-[#2D3436]/50">Efficient</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
            <div className="w-8 h-8 bg-[#A29BFE]/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FaCheck className="text-[#A29BFE]" />
            </div>
            <p className="text-sm text-[#2D3436] font-medium">Unlimited Tasks</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
            <div className="w-8 h-8 bg-[#FDCB82]/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FaCheck className="text-[#FDCB82]" />
            </div>
            <p className="text-sm text-[#2D3436] font-medium">Free Forever</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-100">
            <div className="w-8 h-8 bg-[#81ECEC]/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FaCheck className="text-[#81ECEC]" />
            </div>
            <p className="text-sm text-[#2D3436] font-medium">Sync Across Devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;