import React from "react";

const SortOption = ({ sortType, setSortType }) => {
  return (
    <div className="text-sm">
      <label className="mr-2 font-medium">Sort:</label>
      <select
        className="border p-2 rounded"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="new">Newest</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortOption;
