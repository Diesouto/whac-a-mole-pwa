import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import UserService from "../../services/UserService";
import GameService from "../../services/GameService";
import { strings } from "../../resources/strings";

// Mocks
jest.mock("../../services/UserService");
jest.mock("../../services/GameService");
const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

describe("Home Page", () => {
  test("renders input field and button", () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(
      screen.getByPlaceholderText(strings.home.inputPlaceholder)
    ).toBeInTheDocument();
    expect(screen.getByText(strings.home.startButtonText)).toBeInTheDocument();
  });

  test("navigates to game when username is introduced", () => {
    const setUserMock = jest.spyOn(UserService, "setUser");
    render(<Home />, { wrapper: MemoryRouter });
    userEvent.type(
      screen.getByPlaceholderText(strings.home.inputPlaceholder),
      "prueba"
    );
    fireEvent.click(screen.getByText(strings.home.startButtonText));
    expect(setUserMock).toHaveBeenCalledWith("prueba");
    setUserMock.mockRestore();
  });

  test("does not navigate when username is empty", () => {
    const getUserMock = jest
      .spyOn(UserService, "getUser")
      .mockReturnValueOnce("");
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.queryByText(strings.home.welcomeMessage)).toBeInTheDocument();
    getUserMock.mockRestore();
  });

  test("shows error message when username is empty", () => {
    render(<Home />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(strings.home.startButtonText));
    expect(
      screen.getByText(strings.home.emptyUsernameError)
    ).toBeInTheDocument();
  });
});
