// src/hooks/__tests__/useApi.test.js
import { renderHook, act, waitFor } from "@testing-library/react";
import { useApi } from "../useApi";
import apiService from "../../services/apiService";

// Mock the apiService
vi.mock("../../services/apiService");

describe("useApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with default state", async () => {
    // make sure getItems resolves to empty list to let hook settle
    apiService.getItems.mockResolvedValue([]);

    const { result } = renderHook(() => useApi());

    // initially it may still be loading
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");

    // wait for it to finish
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe("");
  });

  test("fetches items on mount", async () => {
    const mockItems = [
      { id: 1, title: "Item 1", body: "Body 1" },
      { id: 2, title: "Item 2", body: "Body 2" },
    ];

    apiService.getItems.mockResolvedValue(mockItems);

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.items).toEqual(mockItems);
      expect(result.current.loading).toBe(false);
    });
  });

  test("handles fetch error", async () => {
    const errorMessage = "Failed to fetch";
    apiService.getItems.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.loading).toBe(false);
    });
  });

  test("creates item successfully", async () => {
    apiService.getItems.mockResolvedValue([]);

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const newItemData = { title: "New Item", body: "New Body" };

    await act(async () => {
      await result.current.createItem(newItemData);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject(newItemData);
    expect(result.current.items[0]).toHaveProperty("id");
  });

  test("updates item successfully", async () => {
    const initialItems = [{ id: 1, title: "Item 1", body: "Body 1" }];
    apiService.getItems.mockResolvedValue(initialItems);

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.items).toEqual(initialItems);
    });

    const updateData = { title: "Updated Item", body: "Updated Body" };

    await act(async () => {
      await result.current.updateItem(1, updateData);
    });

    expect(result.current.items[0]).toMatchObject({
      id: 1,
      ...updateData,
    });
  });

  test("deletes item successfully", async () => {
    const initialItems = [
      { id: 1, title: "Item 1", body: "Body 1" },
      { id: 2, title: "Item 2", body: "Body 2" },
    ];
    apiService.getItems.mockResolvedValue(initialItems);
    apiService.deleteItem.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.items).toEqual(initialItems);
    });

    await act(async () => {
      await result.current.deleteItem(1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(2);
  });

  test("clears error", async () => {
    apiService.getItems.mockRejectedValue(new Error("Test error"));

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.error).toBe("Test error");
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe("");
  });

  test("handles loading states correctly", async () => {
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    apiService.getItems.mockReturnValue(promise);

    const { result } = renderHook(() => useApi());

    // Should be loading initially
    expect(result.current.loading).toBe(true);

    // Resolve the promise
    await act(async () => {
      resolvePromise([]);
      await promise;
    });

    // Should not be loading after resolution
    expect(result.current.loading).toBe(false);
  });
});
