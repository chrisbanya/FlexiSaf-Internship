import ItemCard from "./ItemCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { useContext } from "react";
import { ItemListContext } from "../contexts/itemListContext";

const ItemList = () => {
  const { items, fetchItems, loading } =
    useContext(ItemListContext);
  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Items ({items.length})</h2>
        <button
          onClick={fetchItems}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          {loading ? "Loading..." : "Refresh (GET)"}
        </button>
      </div>

      {/* Loading state for initial load */}
      {loading && items.length === 0 && (
        <div className="text-center py-8">
          <LoadingSpinner size="large" text="Loading items..." />
        </div>
      )}

      {/* Items */}
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          // onUpdate={onUpdate}
          // onDelete={onDelete}
          // loading={loading}
        />
      ))}

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items found. Create one above!
        </div>
      )}
    </div>
  );
};

export default ItemList;
