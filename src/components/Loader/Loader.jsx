import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative flex items-center justify-center">
        {/* Centered "S" */}
        <span className="text-4xl font-bold text-primary">S</span>
        {/* Spinner */}
        <div className="absolute w-16 h-16 border-4 border-t-4 border-primary border-opacity-30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;