import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemCard from "../ItemCard";
import { ItemListContext } from "../../contexts/itemListContext";

describe("ItemCard", () => {
  const mockItem = {
    id: 1,
    title: "Test Item",
    body: "Test body content",
  };

  const mockContext = {
    loading: false,
    deleteItem: vi.fn(),
    updateItem: vi.fn(),
  };

  beforeEach(() => {
    mockContext.deleteItem.mockClear();
    mockContext.updateItem.mockClear();
  });

  test("renders item data", () => {
    render(
      <ItemListContext.Provider value={mockContext}>
        <ItemCard item={mockItem} />
      </ItemListContext.Provider>
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test body content")).toBeInTheDocument();
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
  });

  test("enters edit mode when edit button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ItemListContext.Provider value={mockContext}>
        <ItemCard item={mockItem} />
      </ItemListContext.Provider>
    );

    await user.click(screen.getByRole("button", { name: /edit/i }));

    expect(screen.getByDisplayValue("Test Item")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test body content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  test("updates item when save is clicked", async () => {
    const user = userEvent.setup();
    mockContext.updateItem.mockResolvedValue();

    render(
      <ItemListContext.Provider value={mockContext}>
        <ItemCard item={mockItem} />
      </ItemListContext.Provider>
    );

    await user.click(screen.getByRole("button", { name: /edit/i }));

    const titleInput = screen.getByDisplayValue("Test Item");
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockContext.updateItem).toHaveBeenCalledWith(1, {
        title: "Updated Title",
        body: "Test body content",
      });
    });
  });

  test("shows delete confirmation dialog", async () => {
    const user = userEvent.setup();

    render(
      <ItemListContext.Provider value={mockContext}>
        <ItemCard item={mockItem} />
      </ItemListContext.Provider>
    );

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete "Test Item"/)
    ).toBeInTheDocument();
  });

  test("deletes item when confirmed", async () => {
    const user = userEvent.setup();
    mockContext.deleteItem.mockResolvedValue();

    render(
      <ItemListContext.Provider value={mockContext}>
        <ItemCard item={mockItem} />
      </ItemListContext.Provider>
    );

    await user.click(screen.getByRole("button", { name: /delete/i }));
    await user.click(screen.getByRole("button", { name: /delete/i })); // Confirm delete

    await waitFor(() => {
      expect(mockContext.deleteItem).toHaveBeenCalledWith(1);
    });
  });
});
