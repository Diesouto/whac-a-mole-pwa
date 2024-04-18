import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import UserService from "../services/UserService";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.setUser("");
  }, []);

  const handleStartGame = () => {
    if (username.trim() === "") {
      alert("Por favor introduce un nombre de usuario válido.");
      return;
    }
    UserService.setUser(username);
    navigate(`/game/`);
  };

  return (
    <div>
      <h1>Bienvenido al Juego de Toca al Topo</h1>
      <input
        name="nombre"
        type="text"
        placeholder="Introduce tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={handleStartGame}>Start</Button>
    </div>
  );
};

export default Home;
