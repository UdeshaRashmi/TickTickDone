import { Link } from 'react-router-dom';
import React from "react";
 
import { 
  FaCheckCircle, 
  FaTasks, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaPlus, 
  FaSignInAlt, 
  FaStar, 
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaCheckSquare,
  FaBell,
  FaHeart
} from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#A29BFE]/5">

      {/* Hero Section with Image */}
      <section className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#FDCB82]/10 rounded-full mb-6">
                <FaStar className="text-[#FDCB82] mr-2" />
                <span className="text-sm font-medium text-[#2D3436]">Trusted by 10,000+ users</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-[#2D3436] mb-6">
                Organize Your Life,{" "}
                <span className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] bg-clip-text text-transparent">
                  One Task at a Time
                </span>
              </h1>
              
              <p className="text-xl text-[#2D3436]/70 mb-8 leading-relaxed">
                A beautiful, intuitive todo app that helps you focus on what matters most. 
                Simple task management with powerful features, all wrapped in a delightful interface.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] hover:from-[#8a83e5] hover:to-[#6bdada] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  <span>Start Free Trial</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-[#2D3436] border-2 border-gray-200 hover:border-[#A29BFE] hover:text-[#A29BFE] px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <FaSignInAlt />
                  <span>Sign In</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#A29BFE]">99%</div>
                  <div className="text-sm text-[#2D3436]/60">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FDCB82]">10K+</div>
                  <div className="text-sm text-[#2D3436]/60">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#81ECEC]">500K+</div>
                  <div className="text-sm text-[#2D3436]/60">Tasks Done</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                  src="/todo1.png"
                  alt="ToDo 1"
                  className="w-full max-w-lg rounded-3xl transform hover:-translate-y-2 transition-transform duration-500"
/>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-[#FDCB82]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] bg-clip-text text-transparent">
                Stay Productive
              </span>
            </h2>
            <p className="text-xl text-[#2D3436]/70 max-w-2xl mx-auto">
              Powerful features designed to make task management simple and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaTasks className="text-[#A29BFE] text-2xl" />,
                title: "Smart Task Management",
                description: "Create, organize, and prioritize tasks with intuitive drag-and-drop",
                color: "from-[#A29BFE]/10 to-[#A29BFE]/5"
              },
              {
                icon: <FaCalendarAlt className="text-[#FDCB82] text-2xl" />,
                title: "Calendar Integration",
                description: "Sync tasks with your calendar and set reminders for deadlines",
                color: "from-[#FDCB82]/10 to-[#FDCB82]/5"
              },
              {
                icon: <FaBell className="text-[#81ECEC] text-2xl" />,
                title: "Smart Reminders",
                description: "Never miss a deadline with intelligent notification system",
                color: "from-[#81ECEC]/10 to-[#81ECEC]/5"
              },
              {
                icon: <FaChartLine className="text-[#A29BFE] text-2xl" />,
                title: "Progress Tracking",
                description: "Visualize your productivity with detailed analytics and reports",
                color: "from-[#A29BFE]/10 to-[#A29BFE]/5"
              },
              {
                icon: <FaShieldAlt className="text-[#FDCB82] text-2xl" />,
                title: "Secure & Private",
                description: "Your data is encrypted and protected with enterprise-grade security",
                color: "from-[#FDCB82]/10 to-[#FDCB82]/5"
              },
              {
                icon: <FaUsers className="text-[#81ECEC] text-2xl" />,
                title: "Team Collaboration",
                description: "Share lists and collaborate with your team in real-time",
                color: "from-[#81ECEC]/10 to-[#81ECEC]/5"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 border border-white hover:border-gray-100 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#2D3436] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#2D3436]/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands who have already simplified their task management with TickTickDone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-[#A29BFE] hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
              >
                <span>Start Free Trial</span>
                <FaArrowRight />
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <span>Learn More</span>
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-80">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

 
    </div>
  );
};

export default Home;