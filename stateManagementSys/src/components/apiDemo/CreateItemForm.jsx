import { useEffect, useRef, useState, useContext} from "react";
import { CreateItemContext } from "../contexts/createItemContext";

const CreateItemForm = () => {
  const {createItem, loading} = useContext(CreateItemContext)
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const myRef = useRef(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!loading && myRef.current) {
        myRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await createItem(formData);
      setFormData({ title: "", body: "" });
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Item (POST)</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          ref={myRef}
          value={formData.title}
          onChange={handleChange("title")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <textarea
          placeholder="Body"
          value={formData.body}
          onChange={handleChange("body")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !formData.title.trim()}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
        >
          {loading ? "Creating..." : "Create Item"}
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;
