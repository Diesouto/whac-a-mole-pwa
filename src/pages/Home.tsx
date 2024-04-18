import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
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
    <main className="container h-100">
      <section className="w-75 h-100 m-auto bg-light border border-primary rounded p-5 d-flex flex-column justify-content-around align-items-center">
        <h1 className="text-center">Bienvenido al Juego de Toca al Topo</h1>
        <Input
          name="nombre"
          placeholder="Introduce tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button className="w-100 text-center" onClick={handleStartGame}>
          Start
        </Button>
      </section>
    </main>
  );
};

export default Home;
