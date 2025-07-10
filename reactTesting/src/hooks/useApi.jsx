import { useState, useEffect } from "react";
import apiService from "../services/apiService";

export const useApi = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const fetchItems = async () => {
    setLoading(true);
    clearError();
    try {
      const data = await apiService.getItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData) => {
    setLoading(true);
    clearError();
    try {
      const dynamicId = Date.now();
      const newItem = { ...itemData, id: dynamicId};
      // const newItem = await apiService.createItem(itemData);
      setItems((prev) => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, itemData) => {
    setLoading(true);
    clearError();
    try {
      const isOriginalPost = typeof id === "number" && id <= 100;
      if (isOriginalPost) {
        try {
          await apiService.updateItem(id, itemData);
        } catch (apiError) {
          console.warn(`Api update faied for post ${id}:`, apiError);
        }
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...itemData } : item))
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    clearError();
    try {
      await apiService.deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    error,
    clearError,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
