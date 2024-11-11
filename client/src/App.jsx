// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignUp';
import LoginPage from './components/Login';
import Dashboard from './components/Dashboard';
import AudioTextConversion from './components/AudioTextConversion';
// import AudioToText from './components/AudioToText';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/audio-text-conversion" element={<AudioTextConversion />} />
                {/* <Route path="/audio-text" element={<AudioToText />} /> */}

            </Routes>
        </Router>
    );
}

export default App;
