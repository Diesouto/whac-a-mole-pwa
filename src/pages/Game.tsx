import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameService from "../services/GameService";
import UserService from "../services/UserService";
import Grid from "../components/Grid";
import Button from "../components/Button";

const Game: React.FC = () => {
  const [points, setPoints] = useState(UserService.getPoints());
  const [difficulty, setDifficulty] = useState("bajo");
  const [molePosition, setMolePosition] = useState<number>(-1); // Initialize mole position
  const [gameRunning, setGameRunning] = useState(false);
  const navigate = useNavigate();
  let intervalId: NodeJS.Timeout;

  const handleWhack = () => {
    const pointsIncrement = GameService.getPointsIncrement(difficulty);
    setPoints(points + pointsIncrement);

    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }

    setMolePosition(-1);
  };

  useEffect(() => {
    if (gameRunning) {
      clearInterval(intervalId);
      startGame();
    }

    return () => clearInterval(intervalId);
  }, [gameRunning, difficulty]);

  const startGame = () => {
    setGameRunning(true);
    intervalId = setInterval(() => {
      const newPosition = GameService.generateRandomMolePosition();
      setMolePosition(newPosition);
    }, GameService.getTimeInterval(difficulty));
  };

  const stopGame = () => {
    setPoints(0);
    setMolePosition(-1);
    clearInterval(intervalId);
    setGameRunning(false);
  };

  function logOut() {
    UserService.logOut();
    navigate("/");
  }

  useEffect(() => {
    if (!UserService.getUser()) {
      logOut();
    }
  }, []);

  return (
    <main className="container h-100">
      <nav className="w-100 p-2 d-flex align-content-center justify-content-between bg-primary">
        <h2 className="text-white flex-fill m-0">{UserService.getUser()}</h2>
        <label className="text-white" htmlFor="dificultad">
          Dificultad:
        </label>
        <select
          id="dificultad"
          className="form-select w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="bajo">Baja</option>
          <option value="medio">Media</option>
          <option value="alto">Alta</option>
        </select>
      </nav>
      <section className="d-flex flex-column justify-content-around text-center">
        <p>Puntos: {points}</p>
        <Grid molePosition={molePosition} handleWhack={handleWhack} />
        <Button onClick={gameRunning ? stopGame : startGame}>
          {gameRunning ? "Stop" : "Start"}
        </Button>
      </section>
    </main>
  );
};

export default Game;
