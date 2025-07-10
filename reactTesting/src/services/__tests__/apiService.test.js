import apiService from "../apiService";

describe("ApiService", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("getItems returns data on success", async () => {
    const mockData = [{ id: 1, title: "Test", body: "Test body" }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiService.getItems();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_limit=3",
      expect.any(Object)
    );
  });

  test("getItems throws error on failed request", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(apiService.getItems()).rejects.toThrow("API request failed");
  });

  test("createItem sends correct data", async () => {
    const mockItem = { title: "New Item", body: "New body" };
    const mockResponse = { id: 1, ...mockItem, userId: 1 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiService.createItem(mockItem);
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ ...mockItem, userId: 1 }),
      })
    );
  });

  test("deleteItem handles successful deletion", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    const result = await apiService.deleteItem(1);
    expect(result).toEqual({ success: true });
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/1",
      { method: "DELETE" }
    );
  });
});
