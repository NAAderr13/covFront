import React from 'react';
import { Search } from '../components/search/Search';
import { FilterPanel } from '../components/rides/FilterPanel';
import { RideList } from '../components/rides/RideList';


export const FindRide = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Find a Ride</h1>
      <div className="mb-8">
        <Search />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>
        <div className="lg:col-span-3">
          <RideList  />
        </div>
      </div>
    </div>
  );
};