import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaRocket } from 'react-icons/fa'; // Icons for buttons

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white">
            {/* Title with Animation */}
            <h1 className="text-7xl font-extrabold text-center animate__animated animate__fadeIn animate__delay-1s">
                🚀 Welcome to Sankalp
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 mt-6 text-center max-w-2xl">
                Communication without limits, accessibility without borders. Let's break barriers together! 🌐
            </p>

            {/* Button Section with Space */}
            <div className="mt-12 flex space-x-6">
                {/* Sign Up Button with Emoji and Icon */}
                <Link to="/signup">
                    <button className="px-10 py-4 bg-gradient-to-r from-green-500 via-teal-600 to-blue-700 text-white rounded-lg shadow-lg hover:scale-110 transition duration-300 transform flex items-center space-x-3">
                        <FaUserPlus size={20} />
                        <span>Sign Up ✨</span>
                    </button>
                </Link>

                {/* Login Button with Emoji and Icon */}
                <Link to="/login">
                    <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-600 text-white rounded-lg shadow-lg hover:scale-110 transition duration-300 transform flex items-center space-x-3">
                        <FaSignInAlt size={20} />
                        <span>Login 🔐</span>
                    </button>
                </Link>
            </div>

            {/* Learn More Button with Rocket Emoji and Icon */}
            <div className="mt-8">
                <Link to="/learn-more">
                    <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-lg shadow-lg hover:scale-110 transition duration-300 transform flex items-center space-x-3">
                        <FaRocket size={20} />
                        <span>Learn More 🚀</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
