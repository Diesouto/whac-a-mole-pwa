import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import UserService from "./services/UserService";

const App: React.FC = () => {
  const username = UserService.getUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {username ? (
          <Route path="/game/" element={<Game />} />
        ) : (
          <Route path="/game/*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
