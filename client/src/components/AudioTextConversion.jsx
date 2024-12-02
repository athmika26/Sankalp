import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMicrophone, HiOutlineSpeakerphone } from "react-icons/hi";

const AudioTextConversion = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-100 via-blue-200 to-green-200">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-blue-800 mb-4 flex items-center justify-center space-x-2">
          <span>🧠</span>
          <span>Neuro-Inclusive Converter</span>
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Convert between audio and text effortlessly! Designed for everyone, especially neurodiverse minds. 💡
        </p>

        {/* Conversion Options */}
        <div className="space-y-6">
          {/* Button for Audio to Text Conversion */}
          <Link to="/audio-text">
            <button className="flex items-center justify-center w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              <HiOutlineMicrophone className="mr-3 text-xl" />
              Audio to Text Conversion
            </button>
          </Link>

          {/* Button for Text to Audio Conversion */}
          <Link to="/text-audio">
            <button className="flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
              <HiOutlineSpeakerphone className="mr-3 text-xl" />
              Text to Audio Conversion
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            🌈 Designed with care to support diverse thinkers. Explore and enjoy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AudioTextConversion;
