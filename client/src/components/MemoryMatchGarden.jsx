import React, { useState, useEffect } from 'react';
import './MemoryMatchGame.css';

const cards = [
  { id: 1, value: '🍎' },
  { id: 2, value: '🍌' },
  { id: 3, value: '🍊' },
  { id: 4, value: '🍍' },
  { id: 5, value: '🍒' },
  { id: 6, value: '🍓' },
  { id: 7, value: '🍉' },
  { id: 8, value: '🍇' },
];

const generateShuffledCards = () => {
  const shuffled = [...cards, ...cards].sort(() => Math.random() - 0.5);
  return shuffled.map((card, index) => ({
    ...card,
    id: index,
    flipped: false,
    matched: false,
  }));
};

const MemoryMatchGame = () => {
  const [cardDeck, setCardDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const guidelinesText = `
    Welcome to the Memory Match Game! Here are the rules:
    1. Flip two cards at a time to try and find a matching pair.
    2. If the cards match, they will stay flipped.
    3. If they do not match, they will flip back over.
    4. Try to match all pairs with the least number of moves to get a high score.
    5. Once all pairs are matched, the game is over and your score will be shown.
    Good luck and have fun!
  `;

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(guidelinesText);

  useEffect(() => {
    setCardDeck(generateShuffledCards());
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.value === secondCard.value) {
        setCardDeck(prevDeck =>
          prevDeck.map(card =>
            card.value === firstCard.value
              ? { ...card, matched: true }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setCardDeck(prevDeck =>
            prevDeck.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }

      setFlippedCards([]);
      setMoves(prevMoves => prevMoves + 1);
    }
  }, [flippedCards]);

  const handleCardClick = card => {
    if (gameOver || card.flipped || card.matched) return;

    setCardDeck(prevDeck =>
      prevDeck.map(c =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );

    setFlippedCards(prevFlipped => [...prevFlipped, card]);

    if (cardDeck.every(card => card.matched)) {
      setGameOver(true);
      const finalScore = Math.max(100 - moves * 10, 0);
      setScore(finalScore);
    }
  };

  const restartGame = () => {
    setCardDeck(generateShuffledCards());
    setFlippedCards([]);
    setGameOver(false);
    setMoves(0);
    setScore(null);
  };

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (!isAudioPlaying) {
        window.speechSynthesis.speak(speechSynthesisUtterance);
        setIsAudioPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        setIsAudioPlaying(false);
      }
    } else {
      alert('Audio playback is not supported on your browser.');
    }
  };

  const renderCards = () => {
    return cardDeck.map(card => (
      <div
        key={card.id}
        className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
        onClick={() => handleCardClick(card)}
      >
        {card.flipped || card.matched ? card.value : '❓'}
      </div>
    ));
  };

  return (
    <div className="game-container">
      <h1>Memory Match Game</h1>
      
      <button className="guidelines-toggle-button" onClick={() => setShowGuidelines(!showGuidelines)}>
        {showGuidelines ? 'Hide Guidelines' : 'Show Guidelines'}
      </button>

      {showGuidelines && (
        <div className="guidelines-section">
          <h2>How to Play</h2>
          {guidelinesText.trim().split('\n').map((line, index) => (
            <p key={index}>{line.trim()}</p>
          ))}
          <div className="audio-controls">
            <button className="audio-button" onClick={toggleAudio}>
              {isAudioPlaying ? '🔇 Stop Audio' : '🔊 Play Guidelines'}
            </button>
          </div>
        </div>
      )}

      <div className="card-grid">{renderCards()}</div>
      
      <div className="game-info">
        <p>Moves: {moves}</p>
        {gameOver && (
          <>
            <div className="game-over">Game Over! You won!</div>
            <div className="score">Your Score: {score}</div>
          </>
        )}
      </div>
      
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default MemoryMatchGame;
