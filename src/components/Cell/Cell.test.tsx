import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

describe("Cell Component", () => {
  test("renders cell without mole", () => {
    const onWhack = jest.fn();
    render(<Cell onWhack={onWhack} isMoleVisible={false} />);
    const cell = screen.getByTestId("cell");
    expect(cell).toBeInTheDocument();
  });

  test("renders cell with mole", () => {
    const onWhack = jest.fn();
    render(<Cell onWhack={onWhack} isMoleVisible={true} />);
    const cell = screen.getByTestId("cell");
    expect(cell).toBeInTheDocument();
  });

  test("calls onWhack handler when cell is clicked and has mole", () => {
    const onWhack = jest.fn();
    render(<Cell onWhack={onWhack} isMoleVisible={true} />);
    const cell = screen.getByTestId("cell");
    fireEvent.click(cell);
    expect(onWhack).toHaveBeenCalled();
  });

  test("displays explosion image when cell is clicked and has mole", () => {
    const onWhack = jest.fn();
    render(<Cell onWhack={onWhack} isMoleVisible={true} />);
    const cell = screen.getByTestId("cell");
    fireEvent.click(cell);
    const explosionImage = screen.getByAltText("Explosion");
    expect(explosionImage).toBeInTheDocument();
  });
});
