
import React from 'react';

const LocationSearch = () => {
  return (
    <div className="w-full px-6 py-4">
      <input
        type="text"
        placeholder="Search location..."
        className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700"
      />
    </div>
  );
};

export default LocationSearch;
