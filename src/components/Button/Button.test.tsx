import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with given text", () => {
    const buttonText = "Click me";
    const onClick = jest.fn();
    render(<Button onClick={onClick}>{buttonText}</Button>);
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  test("calls onClick handler when button is clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
