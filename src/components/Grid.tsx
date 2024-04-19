import React from "react";
import Cell from "./Cell";

interface GridProps {
  cellNumber: number;
  handleWhack: (i: number) => void;
  molePositions?: number[];
}

const Grid: React.FC<GridProps> = ({
  cellNumber,
  handleWhack,
  molePositions = [],
}) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < cellNumber; i++) {
      const isMoleVisible = molePositions.includes(i);
      cells.push(
        <Cell
          key={i}
          onWhack={() => handleWhack(i)}
          isMoleVisible={isMoleVisible}
        />
      );
    }
    return cells;
  };

  return <div className="grid">{renderCells()}</div>;
};

export default Grid;
