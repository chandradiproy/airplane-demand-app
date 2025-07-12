import React, { useState } from 'react';
import { Search, Calendar, PlaneTakeoff, PlaneLanding } from 'lucide-react';

const SearchForm = ({ onSearch, isLoading }) => {
  const [origin, setOrigin] = useState('SYD');
  const [destination, setDestination] = useState('MEL');
  const [dateFrom, setDateFrom] = useState('2025-09-15');
  const [dateTo, setDateTo] = useState('2025-09-22');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination || !dateFrom || !dateTo) {
      setError('All fields are required.');
      return;
    }
    if (new Date(dateTo) < new Date(dateFrom)) {
        setError('Return date cannot be before the departure date.');
        return;
    }
    setError('');
    onSearch({ origin, destination, dateFrom, dateTo });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <div>
          <label htmlFor="origin" className="block text-xs font-medium text-gray-700 mb-1">Origin</label>
          <div className="relative">
            <PlaneTakeoff className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              placeholder="e.g., SYD"
              className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="destination" className="block text-xs font-medium text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <PlaneLanding className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              placeholder="e.g., MEL"
              className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateFrom" className="block text-xs font-medium text-gray-700 mb-1">Departure</label>
           <div className="relative">
            <Calendar className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateTo" className="block text-xs font-medium text-gray-700 mb-1">Return</label>
           <div className="relative">
            <Calendar className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default SearchForm;
