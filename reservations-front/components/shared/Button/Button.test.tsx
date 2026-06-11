import Component from "./Button";
import { render, screen } from "@testing-library/react";

let baseElement: HTMLElement;

describe("Primary Button", () => {
  beforeEach(() => {
    baseElement = render(<Component>Button</Component>).baseElement;
  });

  it("should have the correct text", () => {
    expect(baseElement).toHaveTextContent("Button");
  });

  it("should have primary styles by default", () => {
    const Button = screen.getByText("Button");
    expect(Button).toHaveClass("bg-blue-500");
  });
});
