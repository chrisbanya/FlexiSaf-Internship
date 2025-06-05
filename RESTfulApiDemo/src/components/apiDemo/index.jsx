import { useApi } from "../../hooks/useApi";
import ErrorMessage from "./ErrorMessage";
import CreateItemForm from "./CreateItemForm";
import ItemList from "./ItemList";

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
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        API CRUD Operations
      </h1>

      {/* Error Display */}
      <ErrorMessage error={error} onClose={clearError} />

      {/* Create Form */}
      <CreateItemForm onSubmit={createItem} loading={loading} />

      {/* Items List */}
      <ItemList
        items={items}
        onUpdate={updateItem}
        onDelete={deleteItem}
        onRefresh={fetchItems}
        loading={loading}
      />

      {/* API Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">
          API Operations Demonstrated:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            <strong>GET:</strong> Fetch items on load and refresh
          </li>
          <li>
            <strong>POST:</strong> Create new items with the form above
          </li>
          <li>
            <strong>PUT:</strong> Edit existing items by clicking "Edit"
          </li>
          <li>
            <strong>DELETE:</strong> Remove items by clicking "Delete"
          </li>
        </ul>
        <p className="text-xs text-blue-600 mt-2">
          Using JSONPlaceholder API for demonstration. 
        </p>
      </div>
    </div>
  );
};

export default ApiDemo;
