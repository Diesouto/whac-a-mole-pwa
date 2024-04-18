import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameService from "../services/GameService";
import UserService from "../services/UserService";
import Grid from "../components/Grid";
import Button from "../components/Button";

const Game: React.FC = () => {
  const [points, setPoints] = useState(UserService.getPoints());
  const [difficulty, setDifficulty] = useState("bajo");
  const [molePosition, setMolePosition] = useState<number>(-1); // Initialize mole position

  const handleWhack = () => {
    const pointsIncrement = GameService.getPointsIncrement(difficulty);
    setPoints(points + pointsIncrement);

    // Hide the whacked mole
    setMolePosition(-1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newPosition = GameService.generateRandomMolePosition();
      setMolePosition(newPosition);
    }, GameService.getTimeInterval(difficulty));

    return () => clearInterval(intervalId);
  }, [difficulty]);

  return (
    <div>
      <h2>Bienvenido, {UserService.getUser()}!</h2>
      <p>Puntos: {points}</p>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
      <main>
        <Grid molePosition={molePosition} handleWhack={handleWhack} />
      </main>
      <Button onClick={UserService.logOut}>Stop</Button>
    </div>
  );
};

export default Game;
