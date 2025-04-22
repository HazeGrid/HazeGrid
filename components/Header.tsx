
import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
      <h1 className="text-2xl font-bold">HazeGrid</h1>
      <div className="flex gap-4">
        <button className="bg-gray-800 px-4 py-2 rounded">🌙</button>
        <button className="bg-gray-800 px-4 py-2 rounded">📍</button>
      </div>
    </div>
  );
};

export default Header;
