import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameService from '../services/GameService';
import Grid from '../components/Grid';

type GameParams = {
  username: string;
}

const Game: React.FC = () => {
  const { username } = useParams<GameParams>();
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState('bajo');
  const [molePosition, setMolePosition] = useState<number>(-1); // Initialize mole position


    // Function to handle whacking the mole
    const handleWhack = () => {
      // Increase points based on difficulty
      const pointsIncrement = GameService.getPointsIncrement(difficulty);
      setPoints(points + pointsIncrement);

      // Hide the whacked mole
      setMolePosition(-1);
    };

  useEffect(() => {
    // Function to change mole position every second
    const intervalId = setInterval(() => {
      const newPosition = GameService.generateRandomMolePosition();
      setMolePosition(newPosition);
    }, GameService.getTimeInterval(difficulty)*2); // Use getTimeInterval function

    // Clean up interval
    return () => clearInterval(intervalId);
  }, [difficulty]); // useEffect will run when difficulty changes

  return (
    <div>
      <h2>Bienvenido, {username}!</h2>
      <p>Puntos: {points}</p>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
      <main>
        <Grid molePosition={molePosition} handleWhack={handleWhack} />
      </main>
      <button>Stop</button>
    </div>
  );
};

export default Game;
