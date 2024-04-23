import React, { useState } from "react";
import mole from "../../assets/mole.jpeg";
import explosion from "../../assets/explosion.png";
import "./Cell.css";

interface CellProps {
  onWhack: () => void;
  isMoleVisible: boolean;
}

const Cell: React.FC<CellProps> = ({ onWhack, isMoleVisible }) => {
  const [hasBeenWhacked, setHasBeenWhacked] = useState(false);

  const handleCellClick = () => {
    if (isMoleVisible) {
      onWhack();
      setHasBeenWhacked(true);
      setTimeout(() => {
        setHasBeenWhacked(false);
      }, 200);
    }
  };

  return (
    <div
      className="container cell border border-primary d-inline-flex justify-content-center align-items-center bg-white"
      onClick={handleCellClick}
      data-testid="cell"
    >
      {hasBeenWhacked ? (
        <img className="cell__img" src={explosion} alt="Explosion" />
      ) : (
        isMoleVisible && <img className="cell__img" src={mole} alt="Topo" />
      )}
    </div>
  );
};

export default Cell;
