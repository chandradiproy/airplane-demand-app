import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white mt-auto flex-shrink-0">
      <div className="w-full max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Airline Demand Analyzer. A technical assessment project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
