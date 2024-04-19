import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { strings } from "../../resources/strings";
import Grid from "./Grid";

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
