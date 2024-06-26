import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GameService from "../../services/GameService";
import UserService from "../../services/UserService";
import Grid from "../../components/Grid/Grid";
import Button from "../../components/Button/Button";
import { strings } from "../../resources/strings";

const Game: React.FC = () => {
  const maxTime = 60; // Define the max game time
  const cellNumber = 9; // Define the maximum number of cells
  const moleNumber = 2; // Define max number of moles

  const [points, setPoints] = useState(UserService.getPoints());
  const [difficulty, setDifficulty] = useState("baja");
  const [molePositions, setMolePositions] = useState<number[]>([]);
  const [gameRunning, setGameRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(maxTime); // 1 minute timer
  const navigate = useNavigate();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleWhack = (position: number) => {
    const pointsIncrement = GameService.getPointsIncrement(difficulty);
    setPoints(points + pointsIncrement);

    if ("vibrate" in navigator) {
      navigator.vibrate(200);
    }

    // hide mole
    const updatedMolePositions = molePositions.filter(
      (pos) => pos !== position
    );
    setMolePositions(updatedMolePositions);
  };

  const startGame = useCallback(() => {
    setPoints(0);
    setGameRunning(true);
    setRemainingTime(maxTime);
    intervalIdRef.current = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
      const newPositions: number[] = [];
      for (let i = 0; i < moleNumber; i++) {
        const newPosition = GameService.generateRandomMolePosition();
        newPositions.push(newPosition);
      }
      setMolePositions(newPositions);
    }, GameService.getTimeInterval(difficulty));
  }, [difficulty, moleNumber]);

  const stopGame = useCallback(() => {
    setMolePositions([]);
    setRemainingTime(0);
    clearInterval(intervalIdRef.current!);
    setGameRunning(false);
  }, [intervalIdRef]);

  const logOut = useCallback(() => {
    UserService.logOut();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!UserService.getUser()) {
      logOut();
    }
  }, [logOut]);

  useEffect(() => {
    if (gameRunning) {
      clearInterval(intervalIdRef.current!);
      startGame();
    }

    return () => clearInterval(intervalIdRef.current!);
  }, [gameRunning, startGame]);

  useEffect(() => {
    if (gameRunning && remainingTime === 0) {
      stopGame();
    }
  }, [gameRunning, remainingTime, stopGame]);

  return (
    <main className="container h-100">
      <nav className="w-100 p-2 d-flex align-content-center justify-content-between bg-primary">
        <h2 className="text-white flex-fill m-0">{UserService.getUser()}</h2>
        <label className="text-white m-auto" htmlFor="select-dificultad">
          {strings.game.difficultyLabel}
        </label>
        <select
          id="select-dificultad"
          role="combobox"
          className="form-select w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="baja">{strings.game.difficultyOptions.baja}</option>
          <option value="media">{strings.game.difficultyOptions.media}</option>
          <option value="alta">{strings.game.difficultyOptions.alta}</option>
        </select>
      </nav>
      <section className="d-flex flex-column justify-content-around text-center h-75">
        <p>
          {strings.game.timeLabel} {remainingTime}
        </p>
        <p>
          <label>{strings.game.pointsLabel}</label>
          {points}
        </p>
        <Grid
          cellNumber={cellNumber}
          molePositions={molePositions}
          handleWhack={handleWhack}
        />
        <Button
          className="w-25 mx-auto"
          onClick={gameRunning ? stopGame : startGame}
        >
          {gameRunning ? "Stop" : "Start"}
        </Button>
      </section>
    </main>
  );
};

export default Game;
