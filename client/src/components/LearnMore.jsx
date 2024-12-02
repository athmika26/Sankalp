import React from 'react';
import './LearnMore.css'; 
import { useEffect, useState } from 'react';
import { FaHandsHelping, FaGamepad, FaMicrophone } from 'react-icons/fa'; // Icons for features

// Function to handle scroll animation triggers
const useScrollTrigger = () => {
  const [inView, setInView] = useState(false);

  const onScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementPosition = document.getElementById('feature-box').offsetTop;
    if (scrollPosition >= elementPosition) {
      setInView(true);
    } else {
      setInView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return inView;
};

const LearnMore = () => {
  const inView = useScrollTrigger();

  return (
    <div className="bg-gray-800 text-white min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
        🚀 Welcome to Sankalp: Empowering Neuro-Diverse Learners
      </h1>

      <p className="text-xl text-gray-300 text-center mb-10 max-w-3xl">
        Sankalp is a transformative initiative designed to revolutionize special education for neuro-diverse learners by harnessing the power of cutting-edge technologies. Traditional educational systems often fall short in addressing the diverse needs of neuro-diverse individuals, limiting their ability to communicate, engage, and learn effectively. Sankalp bridges this gap by providing a web-based platform that combines the latest advancements in AI, gesture recognition, and interactive tools to create an inclusive, accessible, and engaging educational environment.
      </p>

      <h2 className="text-3xl font-semibold text-center text-gray-100 mb-4">Key Features:</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 ${inView ? 'animate__animated animate__fadeInUp' : ''}`} id="feature-box">
        <div className="feature-box bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform">
          <FaHandsHelping size={40} className="mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-2">ASL Recognition</h3>
          <p className="text-gray-200 text-center">
            Real-time detection and interpretation of gestures for seamless communication. Enhance accessibility and interaction.
          </p>
        </div>
        <div className="feature-box bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform">
          <FaMicrophone size={40} className="mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-2">Audio-to-Text Summarization</h3>
          <p className="text-gray-200 text-center">
            Bi-directional summarization using advanced natural language processing models for better accessibility and content consumption.
          </p>
        </div>
        <div className="feature-box bg-gradient-to-r from-cyan-500 to-blue-700 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform">
          <FaGamepad size={40} className="mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-2">Educational Games</h3>
          <p className="text-gray-200 text-center">
            Interactive and skill-building games designed to promote cognitive development and make learning enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
