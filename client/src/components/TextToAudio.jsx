import React, { useState } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';

const TTS = () => {
    const [transcription, setTranscription] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [textToSpeak, setTextToSpeak] = useState('');
    const { speak, cancel, speaking } = useSpeechSynthesis();
    const [error, setError] = useState('');

    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result) => setTranscription(result),
        onError: (event) => {
            console.error('Speech recognition error:', event.error);
            setError(event.error === 'network' ? 'Network error. Check your connection.' : 'Speech recognition error.');
        },
    });

    const toggleListening = () => {
        if (listening) {
            stop();
            setIsListening(false);
        } else {
            listen({ interimResults: true, lang: 'en-US' });
            setIsListening(true);
        }
    };

    const handleTextToSpeech = () => {
        if (textToSpeak.trim()) {
            speak({ text: textToSpeak });
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Text to Speech</h2>
            <textarea
                rows="4"
                value={textToSpeak}
                onChange={(e) => setTextToSpeak(e.target.value)}
                placeholder="Enter text to speak"
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            ></textarea>

            <button
                onClick={handleTextToSpeech}
                disabled={!textToSpeak.trim()}
                style={{
                    padding: '10px 20px',
                    background: speaking ? 'orange' : '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: textToSpeak.trim() ? 'pointer' : 'not-allowed',
                }}
            >
                {speaking ? 'Speaking...' : 'Speak Text'}
            </button>
        </div>
    );
};

export default TTS;
