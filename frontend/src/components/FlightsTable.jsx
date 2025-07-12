import React, { useState, useMemo } from 'react';
import { Plane, ArrowDownUp, ArrowRight } from 'lucide-react';

const FlightsTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'ascending' });

  const sortedFlights = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getAirlineLogoUrl = (airlineName) => {
    const domain = airlineName.toLowerCase().replace(/ /g, '').replace(/ltd/g, '').replace(/inc/g, '') + '.com';
    return `https://logo.clearbit.com/${domain}`;
  };

  return (
    // Responsive Height: Set a fixed height on mobile, but let it fill the container on desktop
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-[500px] lg:h-[70vh]">
      <h2 className="text-lg font-bold text-brand-dark mb-3 flex items-center flex-shrink-0">
        <Plane className="mr-2 h-5 w-5 text-brand-secondary" />
        Flight Offers
      </h2>
      <div className="overflow-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-neutral-light sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-[11px] font-bold text-gray-600 uppercase tracking-wider">Airline</th>
              <th scope="col" className="px-3 py-2 text-left text-[11px] font-bold text-gray-600 uppercase tracking-wider">Route</th>
              <th 
                scope="col" 
                className="px-3 py-2 text-left text-[11px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('price')}
              >
                <div className="flex items-center">
                  Price
                  <ArrowDownUp className="ml-1 h-3 w-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedFlights.map((flight) => (
              <tr key={flight.id} className="hover:bg-brand-light transition-colors duration-200">
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={getAirlineLogoUrl(flight.airlineName)} 
                      alt={flight.airlineName} 
                      className="h-5 w-5 mr-2.5 rounded-full object-contain bg-white border"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/20x20/E9ECEF/343A40?text=?" }}
                    />
                    <div className="text-xs font-medium text-gray-900">{flight.carrierCode}</div>
                  </div>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="flex items-center text-xs text-gray-900 font-semibold">
                    {flight.departureAirport}
                    <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />
                    {flight.arrivalAirport}
                  </div>
                  <div className="text-[11px] text-gray-500">{new Date(flight.departureTime).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <div className="text-xs font-semibold text-brand-primary">${parseFloat(flight.price).toFixed(2)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsTable;
