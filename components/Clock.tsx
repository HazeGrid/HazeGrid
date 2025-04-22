
"use client";
import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-right text-gray-400 pr-6 mt-[-2rem]">
      {time}
    </div>
  );
};

export default Clock;
