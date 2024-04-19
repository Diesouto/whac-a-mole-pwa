import React from "react";
import mole from "../../assets/mole.jpeg";
import "./Cell.css";

interface CellProps {
  onWhack: () => void;
  isMoleVisible: boolean;
}

const Cell: React.FC<CellProps> = ({ onWhack, isMoleVisible }) => {
  const handleCellClick = () => {
    if (isMoleVisible) {
      onWhack();
    }
  };

  return (
    <div
      className="container cell border border-primary d-inline-flex justify-content-center align-items-center bg-white"
      onClick={handleCellClick}
      data-testid="cell"
    >
      {isMoleVisible && <img className="cell__img" src={mole} alt="Mole" />}
    </div>
  );
};

export default Cell;
