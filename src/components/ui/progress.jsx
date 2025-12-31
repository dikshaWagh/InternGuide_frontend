import React from "react";

const Progress = ({ value = 0 }) => {
  return (
    <div
      className="relative w-full h-3 rounded-full overflow-hidden bg-gray-200" 
    >
      <div
        className="h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${value}%`,
          background: "#e10505ff", 
        }}
      />
    </div>
  );
};

export default Progress;
