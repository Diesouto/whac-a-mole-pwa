import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Game from "./Game";
import GameService from "../../services/GameService";
import { strings } from "../../resources/strings";

// Mocks
jest.mock("../../services/GameService");
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Game Page", () => {
  test("renders correctly", () => {
    render(<Game />);
    expect(screen.getByText(strings.game.difficultyLabel)).toBeInTheDocument();
  });

  test("updates difficulty when select value changes", () => {
    render(<Game />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "media" },
    });
    expect(GameService.getTimeInterval).toHaveBeenCalledWith("media");
  });
});
