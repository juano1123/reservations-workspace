import React from "react";
import { render, screen } from "@testing-library/react";
import Checkbox, { CheckboxProps } from "./Checkbox";
import "@testing-library/jest-dom";

describe("Checkbox", () => {
  const handleChange = jest.fn();

  const checkboxProps: CheckboxProps = {
    label: "Test Checkbox",
    onChange: handleChange,
  };

  it("renders label correctly", () => {
    render(<Checkbox {...checkboxProps} />);
    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
  });

  it("renders with unchecked state by default", () => {
    render(<Checkbox {...checkboxProps} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).not.toBeFalsy();
  });

  it("renders with checked state when value is 'true'", () => {
    render(<Checkbox {...checkboxProps} value />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeTruthy();
  });
});
