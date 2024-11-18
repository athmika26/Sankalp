// src/components/Dashboard.js
import React from 'react';
import backgroundImage from '../assets/What to know about Deaf culture.jpeg';
import './Dashboard.css'; // Import CSS file for additional styling

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Sankalp</h1>
        
        <p className="text-gray-700 mb-8">Choose an option below:</p>
        
        <div className="flex flex-col space-y-4">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
            ASL Recognition
          </button>
          
          <button 
            onClick={() => navigate('/games')}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none">
            Educational Games
          </button>
          
          <button 
            onClick={() => navigate('/audio-text-conversion')}
            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none"
          >
            Audio & Text Summarization
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
