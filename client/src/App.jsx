// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignUp';
import LoginPage from './components/Login';
import Dashboard from './components/Dashboard';
import AudioTextConversion from './components/AudioTextConversion';
import AudioToText from './components/AudioToText';
import TTS from './components/TextToAudio';
import Games from './components/Games';
import SpellingWordSearch from './components/SpellingWordSearch';
import MemoryMatchGarden from './components/MemoryMatchGarden';
import MathQuest from './components/MathQuest';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/audio-text-conversion" element={<AudioTextConversion />} />
                <Route path="/audio-text" element={<AudioToText />} />
                <Route path="/games" element={<Games />} /> {/* Route to games component */}
                <Route path="/games/spelling-word-search" element={<SpellingWordSearch />} />
                <Route path="/games/memory-match-garden" element={<MemoryMatchGarden />} />
                <Route path="/games/math-quest" element={<MathQuest />} />
                <Route path='/text-audio' element={<TTS />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
