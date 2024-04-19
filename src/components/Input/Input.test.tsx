import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { strings } from "../../resources/strings";
import Input from "./Input";

describe("Input Component", () => {
  test("renders input with given placeholder", () => {
    const placeholder = "Introduce tu nombre";
    const { getByPlaceholderText } = render(
      <Input
        name="nombre"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
      />
    );
    const input = getByPlaceholderText(placeholder);
    expect(input).toBeInTheDocument();
  });

  test("calls onChange handler when input value changes", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        name="nombre"
        placeholder="Introduce tu nombre"
        value=""
        onChange={onChange}
      />
    );
    const input = getByPlaceholderText("Introduce tu nombre");
    fireEvent.change(input, { target: { value: "test" } });
    expect(onChange).toHaveBeenCalled();
  });
});
