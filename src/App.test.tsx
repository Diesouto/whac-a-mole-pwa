import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import UserService from "./services/UserService";
import GameService from "./services/GameService";
import { strings } from "./resources/strings";
import Button from "./components/Button";
import Cell from "./components/Cell";
import Grid from "./components/Grid";
import Input from "./components/Input";

// Mocks
jest.mock("./services/UserService");
jest.mock("./services/GameService");
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

describe("Game Page", () => {
  test("renders correctly", () => {
    render(<Game />);
    expect(screen.getByText(strings.game.difficultyLabel)).toBeInTheDocument();
  });

  test("updates difficulty when select value changes", () => {
    render(<Game />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "media" }, // Ensure that the value matches the expected value
    });
    expect(GameService.getTimeInterval).toHaveBeenCalledWith("media");
  });
});

describe("Button Component", () => {
  test("renders button with given text", () => {
    const buttonText = "Click me";
    const onClick = jest.fn();
    const { getByText } = render(
      <Button onClick={onClick}>{buttonText}</Button>
    );
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  test("calls onClick handler when button is clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe("Cell Component", () => {
  test("renders cell without mole", () => {
    const onWhack = jest.fn();
    const { getByTestId } = render(
      <Cell onWhack={onWhack} isMoleVisible={false} />
    );
    const cell = getByTestId("cell");
    expect(cell).toBeInTheDocument();
  });

  test("renders cell with mole", () => {
    const onWhack = jest.fn();
    const { getByTestId } = render(
      <Cell onWhack={onWhack} isMoleVisible={true} />
    );
    const cell = getByTestId("cell");
    expect(cell).toBeInTheDocument();
  });

  test("calls onWhack handler when cell is clicked and has mole", () => {
    const onWhack = jest.fn();
    const { getByTestId } = render(
      <Cell onWhack={onWhack} isMoleVisible={true} />
    );
    const cell = getByTestId("cell");
    fireEvent.click(cell);
    expect(onWhack).toHaveBeenCalled();
  });
});

describe("Grid Component", () => {
  test("renders grid with given number of cells", () => {
    const cellNumber = 9;
    const molePositions = [-1];
    const handleWhack = jest.fn();
    const { getAllByTestId } = render(
      <Grid
        cellNumber={cellNumber}
        molePositions={molePositions}
        handleWhack={handleWhack}
      />
    );
    const cells = getAllByTestId("cell");
    expect(cells.length).toBe(cellNumber);
  });
});

describe("Input Component", () => {
  test("renders input with given placeholder", () => {
    const placeholder = "Introduce tu nombre";
    const { getByPlaceholderText } = render(
      <Input
        name="nombre"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
      />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  test("calls onChange handler when input value changes", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        name="nombre"
        placeholder="Introduce tu nombre"
        value=""
        onChange={onChange}
      />
    );
    const input = getByPlaceholderText("Introduce tu nombre");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });
});
