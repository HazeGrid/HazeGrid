
import React from 'react';

const TemperatureToggle = () => {
  return (
    <div className="text-sm text-gray-400 flex justify-center items-center gap-4 mt-2">
      <span className="text-white font-semibold">°C</span>
      <span>/</span>
      <span className="text-gray-500">°F</span>
    </div>
  );
};

export default TemperatureToggle;
