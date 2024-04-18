import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import UserService from "./services/UserService";
import GameService from "./services/GameService";

// Mock UserService and GameService methods
jest.mock("./services/UserService");
jest.mock("./services/GameService");

describe("Home Component", () => {
  test("renders input field and button", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(
      screen.getByPlaceholderText(/Introduce tu nombre/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Start/i)).toBeInTheDocument();
  });

  test("navigates to game when username is introduced", () => {
    const setUserMock = jest.spyOn(UserService, "setUser");
    render(<Home />, { wrapper: MemoryRouter });
    userEvent.type(
      screen.getByPlaceholderText(/Introduce tu nombre/i),
      "prueba"
    );
    fireEvent.click(screen.getByText(/Start/i));
    expect(setUserMock).toHaveBeenCalledWith("prueba");
    setUserMock.mockRestore();
  });

  test("does not navigate when username is empty", () => {
    const getUserMock = jest
      .spyOn(UserService, "getUser")
      .mockReturnValueOnce("");
    render(<Home />, { wrapper: MemoryRouter });
    expect(
      screen.queryByText(/Bienvenido al Juego de Toca al Topo/i)
    ).toBeInTheDocument();
    getUserMock.mockRestore();
  });

  test("shows alert when username is empty", () => {
    render(<Home />, { wrapper: MemoryRouter });
    global.alert = jest.fn();
    fireEvent.click(screen.getByText(/Start/i));
    expect(global.alert).toHaveBeenCalledWith(
      "Por favor introduce un nombre de usuario válido."
    );
  });
});

describe("Game Component", () => {
  test("renders correctly", () => {
    render(<Game />);
    expect(screen.getByText(/Puntos:/i)).toBeInTheDocument();
  });

  test("updates difficulty when select value changes", () => {
    render(<Game />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "medio" },
    });
    expect(GameService.getTimeInterval).toHaveBeenCalledWith("medio");
  });
});
