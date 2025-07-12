import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm flex-shrink-0">
      <div className="w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-brand-primary" />
            <span className="ml-2 text-lg font-bold text-brand-dark">
              Airline Demand Analyzer
            </span>
          </div>
          <div className="hidden md:block">
             <span className="text-xs text-gray-500">Powered by Amadeus & Google Gemini</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
