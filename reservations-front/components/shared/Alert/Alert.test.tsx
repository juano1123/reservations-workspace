import Component from "./Alert";
import { render, screen } from "@testing-library/react";

//eslint-disable-next-line @typescript-eslint/no-unused-vars
let baseElement: HTMLElement;

describe("Primary Alert", () => {
  beforeEach(() => {
    baseElement = render(<Component>Primary</Component>).baseElement;
  });

  it("should have primary styles by default", () => {
    const Alert = screen.getByText("Primary");
    expect(Alert).toHaveClass("bg-blue-50");
  });
});
