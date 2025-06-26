import { useState } from "react";
import { useContext } from "react";
import { ItemListContext } from "../contexts/itemListContext";

const ItemCard = ({item}) => {
  const { loading, deleteItem, updateItem} = useContext(ItemListContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item?.title || "",
    body: item?.body || "",
  });

  const handleUpdate = async () => {
    try {
      await updateItem(item.id, editData);
      setIsEditing(false);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleCancel = () => {
    setEditData({ title: item.title, body: item.body });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(item.id);
      } catch (error) {
        // Error handling is done in the parent component
      }
    }
  };

  const handleChange = (field) => (e) => {
    setEditData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={handleChange("title")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <textarea
            value={editData.body}
            onChange={handleChange("body")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            disabled={loading}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <span className="text-sm text-gray-500">ID: {item.id}</span>
          </div>
          <p className="text-gray-600 mb-3">{item.body}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Edit (PUT)
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-3 py-1 rounded-md text-sm transition-colors"
            >
              Delete (DELETE)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
