import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorMessage from "../ErrorMessage";
import { ErrorContext } from "../../contexts/errorContext";

describe("ErrorMessage", () => {
  test("renders nothing when no error", () => {
    const { container } = render(
      <ErrorContext.Provider value={{ error: null, clearError: vi.fn() }}>
        <ErrorMessage />
      </ErrorContext.Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders error message when error exists", () => {
    render(
      <ErrorContext.Provider
        value={{ error: "Test error", clearError: vi.fn() }}
      >
        <ErrorMessage />
      </ErrorContext.Provider>
    );
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  test("calls clearError when close button is clicked", async () => {
    const clearError = vi.fn();
    const user = userEvent.setup();

    render(
      <ErrorContext.Provider value={{ error: "Test error", clearError }}>
        <ErrorMessage />
      </ErrorContext.Provider>
    );

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(clearError).toHaveBeenCalled();
  });
});
