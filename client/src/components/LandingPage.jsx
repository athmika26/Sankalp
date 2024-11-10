// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to Sankalp</h1>
            <p className="text-lg text-gray-700 mt-4">An app dedicated to serving the needs of the dumb and deaf community.</p>
            <div className="mt-8 space-x-4">
                <Link to="/signup">
                    <button className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Sign Up</button>
                </Link>
                <Link to="/login">
                    <button className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
