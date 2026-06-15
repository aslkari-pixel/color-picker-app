import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Content from "./components/Content";
import GetColor from "./components/GetColor";

describe("Color Project Test Suite", () => {
  // Test 1: Content component with empty input
  test("1. Should display Empty Value text when input is empty", () => {
    render(<Content ginput="" hexValue="" />);
    const textElement = screen.getByText(/Empty Value!/i);
    expect(textElement).toBeTruthy();
  });

  // Test 2: Content component with color values
  test("2. Should render color name and hex value correctly", () => {
    render(<Content ginput="red" hexValue="#ff0000" />);
    const colorName = screen.getByText("red");
    const hexValue = screen.getByText("#ff0000");
    expect(colorName).toBeTruthy();
    expect(hexValue).toBeTruthy();
  });

  // Test 3: GetColor component input change
  test("3. Should trigger checkValidation when input changes", () => {
    const mockCheckValidation = jest.fn();
    render(<GetColor ginput="" checkValidation={mockCheckValidation} />);
    const inputElement = screen.getByPlaceholderText(/Add Color Name.../i);

    fireEvent.change(inputElement, { target: { value: "blue" } });

    expect(mockCheckValidation).toHaveBeenCalledWith("blue");
  });

  // Test 4: App component input space removal logic
  test("4. Should remove spaces from input and update color name", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Add Color Name.../i);

    fireEvent.change(inputElement, { target: { value: "b l u e" } });

    const colorNameElement = screen.getByText("blue");
    expect(colorNameElement).toBeTruthy();
  });

  // Test 5: Form submit prevent default behavior
  test("5. Should not refresh the page on form submission", () => {
    render(<GetColor ginput="" checkValidation={() => {}} />);
    const formElement = screen.getByRole("textbox").closest("form");
    const submitEvent = fireEvent.submit(formElement);
    expect(submitEvent).toBe(true);
  });
});
