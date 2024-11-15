// src/components/AudioTextConversion.js
import React from 'react';

const AudioTextConversion = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Audio & Text Conversion</h1>
        
        <div className="flex flex-col space-y-4">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none">
            Audio to Text Conversion
          </button>
          
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none">
            Text to Audio Conversion
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioTextConversion;
