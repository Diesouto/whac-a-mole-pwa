import React from "react";
import { render, screen } from "@testing-library/react";
import Grid from "./Grid";

describe("Grid Component", () => {
  test("renders grid with given number of cells", () => {
    const cellNumber = 9;
    const molePositions = [-1];
    const handleWhack = jest.fn();
    render(
      <Grid
        cellNumber={cellNumber}
        molePositions={molePositions}
        handleWhack={handleWhack}
      />
    );
    const cells = screen.getAllByTestId("cell");
    expect(cells.length).toBe(cellNumber);
  });
});
