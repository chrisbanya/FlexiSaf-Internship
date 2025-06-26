import { useApi } from "../../hooks/useApi";
import ErrorMessage from "./ErrorMessage";
import CreateItemForm from "./CreateItemForm";
import ItemList from "./ItemList";
import { ErrorContext } from "../contexts/errorContext";
import { ItemListContext } from "../contexts/itemListContext";
import { CreateItemContext } from "../contexts/createItemContext";


const ApiDemo = () => {
  const {
    items,
    loading,
    error,
    clearError,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  } = useApi();

  return (
    <ErrorContext.Provider value={{ error, clearError }}>
      <ItemListContext.Provider
        value={{ items, loading, fetchItems, deleteItem, updateItem }}
      >
        <CreateItemContext.Provider value={{ createItem, loading }}>
          <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Most Popular State Management Libraries in React
            </h1>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  <strong>Context Api (USED):</strong> Used to pass data between
                  components without having to pass props down manually.
                </li>
                <li>
                  <strong>Redux:</strong> A state management library that
                  provides a global store for managing application state. It
                  allows for centralized state management and provides tools for
                  managing actions, reducers, and selectors.
                </li>
                <li>
                  <strong>Zustand:</strong> A small, fast, and scalable state
                  management solution that uses hooks to manage state in React
                  applications.
                </li>
              </ul>
            </div>
            {/* Error Display */}
            <ErrorMessage />

            {/* Create Form */}
            <CreateItemForm />

            {/* Items List */}
            <ItemList />
          </div>
        </CreateItemContext.Provider>
      </ItemListContext.Provider>
    </ErrorContext.Provider>
  );
};

export default ApiDemo;
