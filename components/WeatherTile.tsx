
import React from 'react';

interface TileProps {
  label: string;
  value: string;
  description: string;
}

const WeatherTile: React.FC<TileProps> = ({ label, value, description }) => {
  return (
    <div className="p-4 bg-gray-900 rounded text-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </div>
  );
};

export default WeatherTile;
