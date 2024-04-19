import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import UserService from "../../services/UserService";
import { strings } from "../../resources/strings";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.setUser("");
  }, []);

  const handleStartGame = () => {
    if (username.trim() === "") {
      setShowValidationMessage(true);
      return;
    }
    UserService.setUser(username);
    navigate(`/game/`);
  };

  return (
    <main className="container">
      <section className="shadow-lg w-75 m-auto bg-light border border-primary rounded p-5 d-flex flex-column justify-content-around align-items-center">
        <div className="d-flex flex-column justify-content-around gap-3 align-items-center">
          <h1 className="text-center">{strings.home.welcomeMessage}</h1>
          <Input
            name="nombre"
            placeholder={strings.home.inputPlaceholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {showValidationMessage && (
            <span className="text-danger">
              {strings.home.emptyUsernameError}
            </span>
          )}
          <Button className="w-100 text-center" onClick={handleStartGame}>
            {strings.home.startButtonText}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
