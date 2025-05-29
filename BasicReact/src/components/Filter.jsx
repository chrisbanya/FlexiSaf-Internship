import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Filter by Pathway:</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="e.g., Frontend"
        className="p-2 border rounded"
      />
    </div>
  );
};

export default Filter;
