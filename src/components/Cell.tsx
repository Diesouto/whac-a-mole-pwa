import React from "react";

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
      className={`cell ${isMoleVisible ? "mole" : ""}`}
      onClick={handleCellClick}
      style={{
        width: "calc(100vw / 3)",
        height: "calc(100vh / 3)",
        border: "1px solid black",
        boxSizing: "border-box",
        display: "inline-block",
        backgroundColor: isMoleVisible ? "brown" : "grey",
      }}
    ></div>
  );
};

export default Cell;
