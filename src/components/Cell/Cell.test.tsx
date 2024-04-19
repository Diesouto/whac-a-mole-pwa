import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { strings } from "../../resources/strings";
import Cell from "./Cell";

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
