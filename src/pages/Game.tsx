import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GameService from '../services/GameService';

type GameParams = {
  username: string;
}

const Game: React.FC = () => {
  const { username } = useParams<GameParams>();
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState('bajo');

  const handlePlay = () => {
    const newPoints = GameService.play(difficulty);
    setPoints(points + newPoints);
  };

  return (
    <div>
      <h2>Bienvenido, {username}!</h2>
      <p>Puntos: {points}</p>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
      <button onClick={handlePlay}>Jugar</button>
    </div>
  );
};

export default Game;
