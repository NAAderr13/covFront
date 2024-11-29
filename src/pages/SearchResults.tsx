import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterPanel } from '../components/rides/FilterPanel';
import { RideList } from '../components/rides/RideList';
import { mockRides } from '../utils/mockData';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  // Filter rides based on search params
  const filteredRides = mockRides.filter(ride => {
    const matchesOrigin = !from || ride.origin.toLowerCase().includes(from.toLowerCase());
    const matchesDestination = !to || ride.destination.toLowerCase().includes(to.toLowerCase());
    const matchesDate = !date || ride.date === date;
    return matchesOrigin && matchesDestination && matchesDate;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        <p className="mt-2 text-gray-600">
          Showing rides from {from || 'anywhere'} to {to || 'anywhere'}
          {date && ` on ${new Date(date).toLocaleDateString()}`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>
        <div className="lg:col-span-3">
          <RideList rides={filteredRides} />
        </div>
      </div>
    </div>
  );
};