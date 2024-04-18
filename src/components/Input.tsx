import React from "react";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      name={name}
      className={"form-control " + className}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
