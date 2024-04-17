import React from 'react';

interface CellProps {
  onWhack: () => void;
  isMoleVisible: boolean;
}

const Cell: React.FC<CellProps> = ({ onWhack, isMoleVisible }) => {
  const handleCellClick = () => {
    if (isMoleVisible) {
      onWhack(); // Call the onWhack function if the mole is visible and the cell is clicked
    }
  };

  return (
    <div
      className={`cell ${isMoleVisible ? 'mole' : ''}`}
      onClick={handleCellClick}
      style={{
        width: 'calc(100vw / 3)', // Each cell should be 1/3 of the viewport width
        height: 'calc(100vh / 3)', // Each cell should be 1/3 of the viewport height
        border: '1px solid black', // Add border for clarity
        boxSizing: 'border-box', // Ensure border is included in width/height calculation
        display: 'inline-block', // Ensure cells are displayed in a row
        backgroundColor: isMoleVisible ? 'brown' : 'grey', // Change background color based on mole visibility
      }}
    ></div>
  );
};


export default Cell;
