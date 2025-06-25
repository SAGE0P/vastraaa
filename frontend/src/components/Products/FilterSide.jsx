import React from "react";

const FilterSide = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select className="w-full border p-2 rounded mt-1">
            <option>All</option>
            <option>T-Shirts</option>
            <option>Hoodies</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Color</label>
          <select className="w-full border p-2 rounded mt-1">
            <option>All</option>
            <option>Red</option>
            <option>Black</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSide;
