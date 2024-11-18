// src/components/Games.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Games.css';

const gamesData = [
  { 
    id: 'spelling-word-search', 
    name: 'Spelling and Word Search Maze', 
    description: 'Find the hidden word by selecting the correct letters in this fun word search game!' 
  },
  { 
    id: 'memory-match-garden', 
    name: 'Memory Match Garden', 
    description: 'Match pairs of cards in this memory game set in a beautiful garden!' 
  },
  { 
    id: 'math-quest', 
    name: 'Math Quest', 
    description: 'Solve math puzzles and challenges as you embark on a quest to become a math wizard!' 
  },
];

const Games = () => {
  const navigate = useNavigate();

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Choose a Game</h1>
      <div className="flex flex-col space-y-4">
        {gamesData.map((game) => (
          <div
            key={game.id}
            onClick={() => handleGameClick(game.id)}
            className="game-card bg-gray-100 p-4 rounded-md shadow-md hover:bg-gray-200 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
