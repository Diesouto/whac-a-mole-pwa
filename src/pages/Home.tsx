import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import UserService from "../services/UserService";

const Home: React.FC = () => {
  const [username, setUsername] = useState(UserService.getUser() || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (username.trim() !== "") {
      navigate(`/game/${username}`);
    }
  }, []);

  const handleStartGame = () => {
    if (username.trim() === "") {
      alert("Por favor introduce un nombre de usuario válido.");
      return;
    }
    UserService.setUser(username);
    navigate(`/game/${username}`);
  };

  return (
    <div>
      <h1>Bienvenido al Juego de Toca al Topo</h1>
      <input
        type="text"
        placeholder="Introduce tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={handleStartGame} children="Start"></Button>
    </div>
  );
};

export default Home;
