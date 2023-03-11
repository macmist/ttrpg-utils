import MapSizeSelector from "./MapSizeSelector";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

it("should render a number selector and a button", () => {
  render(<MapSizeSelector />);
  const option = screen.getByRole("combobox");
  const button = screen.getByRole("button");

  expect(option).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

it("calls onRegenerate when button is clicked", () => {
  const mock = jest.fn();

  render(<MapSizeSelector onRegenerate={mock} />);

  const button = screen.getByRole("button");
  user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(9);
});
