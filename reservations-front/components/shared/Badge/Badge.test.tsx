import Component from "./Badge";
import { render, screen } from "@testing-library/react";

let baseElement: HTMLElement;

describe("Primary Badge", () => {
  beforeEach(() => {
    baseElement = render(<Component>Badge</Component>).baseElement;
  });

  it("should have the correct text", () => {
    expect(baseElement).toHaveTextContent("Badge");
  });

  it("should have primary styles by default", () => {
    const Badge = screen.getByText("Badge");
    expect(Badge).toHaveClass("bg-blue-50");
  });
});
