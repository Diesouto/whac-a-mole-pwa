import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (username.trim() !== '') {
      navigate(`/game/${username}`);
    } else {
      alert('Por favor introduce un nombre de usuario válido.');
    }
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
      <button onClick={handleStartGame}>Comenzar Juego</button>
    </div>
  );
};

export default Home;
