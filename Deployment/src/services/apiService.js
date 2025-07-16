const API_BASE = "https://jsonplaceholder.typicode.com/posts";

class ApiService {
  async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  // GET 
  async getItems(limit = 10) {
    return this.request(`${API_BASE}?_limit=${limit}`);
  }

  // POST 
  async createItem(itemData) {
    return this.request(API_BASE, {
      method: "POST",
      body: JSON.stringify({
        ...itemData,
        userId: 1,
      }),
    });
  }

  // PUT
  async updateItem(id, itemData) {
    return this.request(`${API_BASE}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id,
        ...itemData,
        userId: 1,
      }),
    });
  }

  // DELETE 
  async deleteItem(id) {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.status}`);
    }

    return { success: true };
  }
}

export default new ApiService();
