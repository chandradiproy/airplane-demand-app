import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const PriceChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const pricesByDay = data.reduce((acc, flight) => {
    const date = new Date(flight.departureTime).toLocaleDateString('en-CA');
    const price = parseFloat(flight.price);
    
    if (!acc[date]) {
      acc[date] = { prices: [] };
    }
    acc[date].prices.push(price);
    
    return acc;
  }, {});

  const chartData = Object.keys(pricesByDay).map(date => {
    const prices = pricesByDay[date].prices;
    const sum = prices.reduce((a, b) => a + b, 0);
    const avg = sum / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    return {
      date: new Date(date).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric' }),
      min: min,
      avg: parseFloat(avg.toFixed(2)),
      max: max,
    };
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    // Responsive Height
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-[400px] lg:h-[70vh]">
      <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center flex-shrink-0">
        <TrendingUp className="mr-2 h-5 w-5 text-brand-secondary" />
        Daily Price Analysis
      </h2>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis 
              tickFormatter={(value) => `$${value}`} 
              tick={{ fontSize: 10 }}
              domain={['dataMin - 50', 'auto']}
            />
            <Tooltip
              contentStyle={{ fontSize: '12px', padding: '5px', borderRadius: '6px' }}
              formatter={(value, name) => [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="min" fill="#82ca9d" name="Minimum" />
            <Bar dataKey="avg" fill="#8884d8" name="Average" />
            <Bar dataKey="max" fill="#ff7300" name="Maximum" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
