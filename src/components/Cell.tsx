import React from "react";
import mole from "../assets/mole.jpeg";

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
      className="container border border-primary d-inline-flex justify-content-center align-items-center bg-white"
      onClick={handleCellClick}
      style={{
        width: "calc(60vw/4)",
        height: "calc(60vw/4)",
        maxWidth: "100px",
        maxHeight: "100px",
      }}
      data-testid="cell"
    >
      {isMoleVisible && (
        <img
          className="w-100 h-100 p-0 m-0 object-fit-cover"
          src={mole}
          alt="Mole"
        />
      )}
    </div>
  );
};

export default Cell;
