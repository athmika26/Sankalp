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
  const [feedback, setFeedback] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setFeedback('');
  };

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (userAnswer === '') {
      setFeedback('Please enter an answer!');
      return;
    }

    const isCorrect = parseInt(userAnswer, 10) === correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct answer was ${correctAnswer}.`);
    }

    if (score + 1 >= 5 && isCorrect) {
      setIsGameOver(true);
    } else {
      generateNewQuestion();
    }

    setUserAnswer('');
  };

  const handleRestart = () => {
    setScore(0);
    setIsGameOver(false);
    setFeedback('');
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

      <button onClick={() => setShowGuidelines(!showGuidelines)}>
        {showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}
      </button>

      {showGuidelines && (
        <div className="guidelines-container">
          <h3>How to Play:</h3>
          <ul>
            {guidelines
              .trim()
              .split('\n')
              .map((line, index) => (
                <li key={index}>{line.trim()}</li>
              ))}
          </ul>
          <button onClick={toggleAudio}>
            {isPlaying ? '🔇 Stop Audio' : '🔊 Play Guidelines'}
          </button>
        </div>
      )}

      {!isGameOver ? (
        <div>
          <div className="question-container">
            <p>Question: {question}</p>
            <input
              type="number"
              value={userAnswer}
              onChange={handleAnswerChange}
              placeholder="Enter your answer"
            />
            <button onClick={handleSubmit}>Submit Answer</button>
          </div>

          {feedback && <div className="feedback">{feedback}</div>}

          <p>Score: {score}</p>
        </div>
      ) : (
        <div className="game-over">
          <p>Game Over! You scored {score} points.</p>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default MathsQuestGame;
