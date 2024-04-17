import React from 'react';
import Cell from './Cell';

interface GridProps {
  molePosition: number; // Array position that contains the mole
  handleWhack: () => void;
}

const Grid: React.FC<GridProps> = ({ molePosition, handleWhack }) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(
        <Cell key={i} onWhack={handleWhack} isMoleVisible={i === molePosition} />
      );
    }
    return cells;
  };

  return <div className="grid">{renderCells()}</div>;
};

export default Grid;
