import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FlightsTable from './components/FlightsTable';
import PriceChart from './components/PriceChart';
import InsightsPanel from './components/InsightsPanel';
import WelcomePlaceholder from './components/WelcomePlaceholder';
import Loader from './components/Loader';
import Footer from './components/Footer';
import { Plane, AlertTriangle } from 'lucide-react';

const API_BASE_URL = '';

function App() {
  const [flightData, setFlightData] = useState([]);
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError('');
    setFlightData([]);
    setInsights('');
    setHasSearched(true);

    try {
      // The request now goes to `/api/search-flights`
      const flightResponse = await axios.post(`${API_BASE_URL}/api/search-flights`, searchParams);
      
      if (flightResponse.data && flightResponse.data.length > 0) {
        setFlightData(flightResponse.data);
        const insightResponse = await axios.post(`${API_BASE_URL}/api/generate-insights`, {
          flightData: flightResponse.data,
        });
        setInsights(insightResponse.data.insights);
      } else {
        setFlightData([]);
        setInsights('');
      }

    } catch (err) {
      console.error("An error occurred:", err);
      const errorMessage = err.response?.data?.detail || 'An unexpected error occurred. Please check the backend server and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center h-full"><Loader /></div>;
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 border-l-4 border-red-500 rounded-r-lg m-4">
          <AlertTriangle className="mx-auto h-10 w-10 text-red-500" />
          <h3 className="mt-2 text-md font-semibold text-red-800">Error Fetching Data</h3>
          <p className="mt-1 text-xs text-red-700">{typeof error === 'string' ? error : JSON.stringify(error)}</p>
        </div>
      );
    }

    if (!hasSearched) {
      return <WelcomePlaceholder />;
    }

    if (flightData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
              <AlertTriangle className="mx-auto h-10 w-10 text-yellow-500" />
              <h3 className="mt-2 text-md font-semibold text-yellow-800">No Flights Found</h3>
              <p className="mt-1 text-xs text-yellow-700">We couldn't find any flights for the selected route and dates.</p>
            </div>
        </div>
      );
    }

    // Responsive Grid: Stacks on mobile, becomes 3-column on large screens
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FlightsTable data={flightData} />
        <PriceChart data={flightData} />
        <InsightsPanel insights={insights} />
      </div>
    );
  };

  return (
    // Use min-h-screen to allow content to grow vertically on mobile
    <div className="max-h-screen flex flex-col bg-neutral-light">
      <Header />
      <div className="w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
      </div>
      {/* flex-grow allows this main section to take up available space */}
      <main className="flex-grow w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        {renderResults()}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
