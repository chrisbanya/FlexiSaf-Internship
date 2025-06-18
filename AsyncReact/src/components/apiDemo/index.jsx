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
        Asynchronous React
      </h1>
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            <strong>JSON:</strong> Mostly used as the format for data
            interchange between frontend and backend.
          </li>
          <li>
            <strong>Form Data:</strong> Used to handle user inputs, sometimes
            combined with APIs for submission.
          </li>
          <li>
            <strong>Promises:</strong> A way to handle asynchronous operations,
            providing <code>.then()</code> and <code>.catch()</code>methods.
          </li>
          <li>
            <strong>Async/Await:</strong> A cleaner syntax for handling
            Promises, making asynchronous code look more like synchronous code.
          </li>
        </ul>
      </div>
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
    </div>
  );
};

export default ApiDemo;
