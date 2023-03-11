import MapSizeSelector from "./MapSizeSelector";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

it("should render a number selector and two button", () => {
  render(<MapSizeSelector />);
  const option = screen.getByRole("combobox");
  const buttons = screen.getAllByRole("button");

  expect(option).toBeInTheDocument();
  expect(buttons).toHaveLength(2);
});

it("calls onRegenerate when button is clicked", () => {
  const mock = jest.fn();

  render(<MapSizeSelector onRegenerate={mock} />);

  const buttons = screen.getAllByRole("button");
  const button = buttons.find((x) => {
    return x.textContent === "Re-generate";
  });
  if (button) user.click(button);
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(9);
});
