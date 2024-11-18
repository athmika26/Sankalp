import React, { useState, useEffect } from 'react';
import './MathsQuestGame.css';

const getRandomQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
  const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)]; // Random operation
  let question = '';
  let answer = 0;

  switch (operation) {
    case '+':
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case '-':
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case '*':
      question = `${num1} * ${num2}`;
      answer = num1 * num2;
      break;
    default:
      break;
  }

  return { question, answer };
};

const MathsQuestGame = () => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false); // State to toggle guidelines visibility
  const [isPlaying, setIsPlaying] = useState(false); // Audio playing state

  const guidelines = `
    Welcome to MathsQuest Game! Here's how to play:
    1. A random math question will be displayed.
    2. Enter your answer in the input box.
    3. Click 'Submit Answer' to check if you're correct.
    4. The game ends after you score 5 points.
    5. Try to get as many correct answers as possible!
  `;

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(guidelines);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const newQuestion = getRandomQuestion();
    setQuestion(newQuestion.question);
    setCorrectAnswer(newQuestion.answer);
  };

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect! Try again.');
    }

    if (score + 1 >= 5) {
      setIsGameOver(true); // Ends the game if score reaches 5
    } else {
      generateNewQuestion(); // Generate a new question
    }

    setUserAnswer(''); // Clear the input after submission
  };

  const handleRestart = () => {
    setScore(0);
    setIsGameOver(false);
    setFeedback(null); // Reset feedback
    setUserAnswer('');
    generateNewQuestion();
  };

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
      } else {
        window.speechSynthesis.speak(speechSynthesisUtterance);
      }
      setIsPlaying(!isPlaying);
    } else {
      alert('Audio playback is not supported on your browser.');
    }
  };

  return (
    <div className="game-container">
      <h1>MathsQuest Game</h1>

      {/* Button to toggle the guidelines visibility */}
      <div className="guidelines-toggle">
        <button onClick={() => setShowGuidelines(!showGuidelines)}>
          {showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}
        </button>
      </div>

      {/* Guidelines section */}
      {showGuidelines && (
        <div className="guidelines-container">
          <div className="guidelines-box">
            <h3>How to Play:</h3>
            {/* Use separate lines for each instruction */}
            <ul>
              <li>1. A random math question will be displayed.</li>
              <li>2. Enter your answer in the input box.</li>
              <li>3. Click 'Submit Answer' to check if you're correct.</li>
              <li>4. The game ends after you score 5 points.</li>
              <li>5. Try to get as many correct answers as possible!</li>
            </ul>
            {/* Button to toggle audio */}
            <button onClick={toggleAudio}>
              {isPlaying ? '🔇 Stop Audio' : '🔊 Play Guidelines'}
            </button>
          </div>
        </div>
      )}

      {/* Question and answer section */}
      <div className="question-container">
        <p>Question: {question}</p>
        <input
          type="number"
          value={userAnswer}
          onChange={handleAnswerChange}
          disabled={isGameOver}
        />
        <button onClick={handleSubmit} disabled={isGameOver}>
          Submit Answer
        </button>
      </div>

      {/* Feedback message */}
      {feedback && !isGameOver && (
        <div className="feedback">
          {feedback}
        </div>
      )}

      {/* Game Over message */}
      {isGameOver && (
        <div className="game-over">
          <p>Game Over! You scored {score} points.</p>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}

      {/* Score display */}
      {!isGameOver && <p>Score: {score}</p>}
    </div>
  );
};

export default MathsQuestGame;
