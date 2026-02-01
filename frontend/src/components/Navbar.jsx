import { Link, useNavigate } from 'react-router-dom';
import React from "react";
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaCheckSquare } from 'react-icons/fa';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-[#A29BFE] text-white shadow-md" style={{
      '--primary': '#A29BFE',
      '--primary-dark': '#8a83e5',
      '--secondary': '#FDCB82',
      '--accent': '#81ECEC',
      '--text': '#2D3436'
    }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-gray-100 transition">
            <FaCheckSquare className="text-2xl" />
            <span>TickTickDone</span>
          </Link>

          <div className="flex space-x-6">
                  <Link
                    to="/"
                    className="flex items-center space-x-1 hover:text-gray-200 transition px-3 py-1 rounded hover:bg-[#8a83e5]"
                  >
                    <FaHome />
                    <span>Home</span>
                  </Link>

                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/todo" 
                        className="flex items-center space-x-1 hover:text-gray-200 transition px-3 py-1 rounded hover:bg-[#8a83e5]"
                      >
                        <FaUser />
                        <span>My Tasks</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-1 hover:text-gray-200 transition px-3 py-1 rounded hover:bg-[#8a83e5]"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="flex items-center space-x-1 hover:text-gray-200 transition px-3 py-1 rounded hover:bg-[#8a83e5]"
                      >
                        <FaSignInAlt />
                        <span>Login</span>
                      </Link>
                      <Link 
                        to="/signup" 
                        className="flex items-center space-x-1 hover:text-gray-200 transition px-3 py-1 rounded hover:bg-[#8a83e5]"
                      >
                        <FaUserPlus />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;