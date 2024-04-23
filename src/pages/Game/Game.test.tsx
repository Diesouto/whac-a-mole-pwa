import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Game from "./Game";
import { strings } from "../../resources/strings";

// Mocks
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

    expect(screen.getByRole("combobox")).toHaveValue("media");
  });

  test("stops game after time runs out", () => {
    jest.useFakeTimers();
    render(<Game />);
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(screen.getByText("Start")).toBeInTheDocument();
    jest.useRealTimers();
  });
});
