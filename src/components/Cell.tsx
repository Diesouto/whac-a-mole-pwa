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
      className="cell"
      onClick={handleCellClick}
      style={{
        width: "calc(60vw / 3)",
        height: "calc(60vh / 3)",
        border: "1px solid black",
        boxSizing: "border-box",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {isMoleVisible && (
        <img
          src="/mole.jpeg"
          alt="Mole"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      )}
    </div>
  );
};

export default Cell;
