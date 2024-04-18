import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      type="button"
      className={"btn btn-primary " + className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
