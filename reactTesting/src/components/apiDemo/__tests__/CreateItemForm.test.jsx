import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateItemForm from "../CreateItemForm";
import { CreateItemContext } from "../../contexts/createItemContext";

describe("CreateItemForm", () => {
  const mockCreateItem = vi.fn();
  const defaultContext = {
    createItem: mockCreateItem,
    loading: false,
  };

  beforeEach(() => {
    mockCreateItem.mockClear();
  });

  test("renders form fields", () => {
    render(
      <CreateItemContext.Provider value={defaultContext}>
        <CreateItemForm />
      </CreateItemContext.Provider>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create item/i })
    ).toBeInTheDocument();
  });

  test("submits form with correct data", async () => {
    const user = userEvent.setup();
    mockCreateItem.mockResolvedValue({ id: 1 });

    render(
      <CreateItemContext.Provider value={defaultContext}>
        <CreateItemForm />
      </CreateItemContext.Provider>
    );

    await user.type(screen.getByLabelText(/title/i), "Test Title");
    await user.type(screen.getByLabelText(/body/i), "Test Body");
    await user.click(screen.getByRole("button", { name: /create item/i }));

    await waitFor(() => {
      expect(mockCreateItem).toHaveBeenCalledWith({
        title: "Test Title",
        body: "Test Body",
      });
    });
  });

  test("clears form after successful submission", async () => {
    const user = userEvent.setup();
    mockCreateItem.mockResolvedValue({ id: 1 });

    render(
      <CreateItemContext.Provider value={defaultContext}>
        <CreateItemForm />
      </CreateItemContext.Provider>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);

    await user.type(titleInput, "Test Title");
    await user.type(bodyInput, "Test Body");
    await user.click(screen.getByRole("button", { name: /create item/i }));

    await waitFor(() => {
      expect(titleInput).toHaveValue("");
      expect(bodyInput).toHaveValue("");
    });
  });

  test("prevents submission when title is empty", async () => {
    const user = userEvent.setup();

    render(
      <CreateItemContext.Provider value={defaultContext}>
        <CreateItemForm />
      </CreateItemContext.Provider>
    );

    const submitButton = screen.getByRole("button", { name: /create item/i });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/title/i), "   "); // Only whitespace
    expect(submitButton).toBeDisabled();
  });

  test("shows loading state", () => {
    render(
      <CreateItemContext.Provider value={{ ...defaultContext, loading: true }}>
        <CreateItemForm />
      </CreateItemContext.Provider>
    );

    expect(screen.getByText("Creating...")).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeDisabled();
    expect(screen.getByLabelText(/body/i)).toBeDisabled();
  });
});
