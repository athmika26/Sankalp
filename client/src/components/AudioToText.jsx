import React, { useState, useEffect, useRef } from 'react';

const AudioToText = () => {
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false; // Set to false for debugging
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const speechToText = event.results[0][0].transcript;
                console.log('Transcribed text:', speechToText);
                setTranscript(speechToText);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event);
                setError(`Error: ${event.error}`);
                setIsListening(false);
            };

            recognition.onend = () => {
                console.log('Recognition ended');
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            setError('Your browser does not support speech recognition. Please try using Google Chrome.');
        }
    }, []);

    const startRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
            setIsListening(true);
            setError('');
            console.log('Recognition started');
        } else {
            setError('Speech recognition is not available.');
        }
    };

    const stopRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            console.log('Recognition stopped');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Speech to Text Debug</h1>
            <button
                onClick={isListening ? stopRecognition : startRecognition}
                style={{
                    padding: '10px 20px',
                    margin: '10px 10px 0 0',
                    background: isListening ? '#FF5733' : '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your transcribed text will appear here."
                style={{
                    width: '100%',
                    height: '100px',
                    margin: '20px 0',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '16px',
                }}
            />
        </div>
    );
};

export default AudioToText;
