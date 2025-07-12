import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-primary"></div>
      <p className="mt-4 text-lg font-semibold text-brand-dark">Analyzing Market Data...</p>
      <p className="text-sm text-gray-500">Fetching flights and generating insights.</p>
    </div>
  );
};

export default Loader;
