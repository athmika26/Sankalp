import React, { useState, useEffect } from 'react';
import './SpellingWordSearch.css';

const wordsToFind = ['apple', 'banana', 'orange', 'kiwi'];

const generateBoard = (size = 9) => {
  const board = Array.from({ length: size }, () => Array(size).fill(''));

  wordsToFind.forEach(word => {
    const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    const startRow = Math.floor(Math.random() * size);
    const startCol = Math.floor(Math.random() * size);

    for (let i = 0; i < word.length; i++) {
      if (direction === 'horizontal') {
        if (startCol + i < size) {
          board[startRow][startCol + i] = word[i];
        }
      } else {
        if (startRow + i < size) {
          board[startRow + i][startCol] = word[i];
        }
      }
    }
  });

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!board[row][col]) {
        board[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }
  return board;
};

const SpellingWordSearch = () => {
  const [board, setBoard] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Audio playing state
  const [showGuidelines, setShowGuidelines] = useState(false); // Guidelines toggle

  const guidelinesText = `
    Welcome to the Spelling and Word Search Maze! Here are the rules:
    1. Find all the hidden words listed in the "Words to Find" section.
    2. Click on letters in the grid to select them and form words.
    3. If you find a word, it will be added to your "Found Words" list.
    4. Try to find all words before submitting your score.
    Good luck and have fun!
  `;

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(guidelinesText);

  useEffect(() => {
    const newBoard = generateBoard();
    setBoard(newBoard);
  }, []);

  const handleCellClick = (row, col) => {
    if (isGameOver) return;

    const selectedLetter = board[row][col];
    const newSelectedLetters = [...selectedLetters, { letter: selectedLetter, row, col }];
    setSelectedLetters(newSelectedLetters);

    const currentWord = newSelectedLetters.map(cell => cell.letter).join('');

    if (wordsToFind.includes(currentWord) && !foundWords.includes(currentWord)) {
      setFoundWords(prev => [...prev, currentWord]);
      setSelectedLetters([]);
    }
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => {
          const isSelected = selectedLetters.some(
            letter => letter.row === rowIndex && letter.col === colIndex
          );
          return (
            <div
              key={colIndex}
              className={`board-cell ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          );
        })}
      </div>
    ));
  };

  const restartGame = () => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    setFoundWords([]);
    setSelectedLetters([]);
    setIsGameOver(false);
    setScore(0);
  };

  const submitScore = () => {
    setScore(foundWords.length);
    setIsGameOver(true);
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
      <h1>Spelling and Word Search Maze</h1>

      <button className="guidelines-toggle-button" onClick={() => setShowGuidelines(!showGuidelines)}>
        {showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}
      </button>

      {showGuidelines && (
        <div className="guidelines-section">
          <h2>How to Play</h2>
          {guidelinesText.trim().split('\n').map((line, index) => (
            <p key={index}>{line.trim()}</p>
          ))}
          <button className="audio-button" onClick={toggleAudio}>
            {isPlaying ? '🔇 Stop Audio' : '🔊 Play Guidelines'}
          </button>
        </div>
      )}

      <div className="board-container">
        {renderBoard()}
      </div>

      <div className="game-info">
        <h2>Words to Find:</h2>
        <ul>
          {wordsToFind.map(word => (
            <li key={word}>{word}</li>
          ))}
        </ul>

        <h2>Found Words:</h2>
        <ul>
          {foundWords.map(word => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>

      {isGameOver && (
        <div className="game-over">
          <p>Game Over! You found {score} out of {wordsToFind.length} words!</p>
        </div>
      )}

      <div className="buttons">
        <button className="restart-button" onClick={restartGame}>
          Restart Game
        </button>
        <button className="submit-button" onClick={submitScore}>
          Submit Score
        </button>
      </div>
    </div>
  );
};

export default SpellingWordSearch;
