import { FaHeart, FaGithub } from 'react-icons/fa';
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="flex items-center text-[#2D3436]/70">
              Made with <FaHeart className="text-red-400 mx-1" /> by TickTickDone
            </p>
            <p className="text-sm text-[#2D3436]/70 mt-1">© 2026 All rights reserved</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-[#2D3436]/70 hover:text-[#A29BFE] transition duration-300"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-[#2D3436]/70 hover:text-[#FDCB82] transition duration-300"
            >
              Terms of Service
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#2D3436]/70 hover:text-[#81ECEC] transition duration-300 group"
            >
              <FaGithub className="text-lg" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;