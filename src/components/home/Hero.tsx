import React from 'react';
import { Search } from '../search/Search';

export const Hero = () => {
  return (
    <div className="relative bg-indigo-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1557766131-dae3fb3d7a5d"
          alt="Carpooling"
        />
        <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Share Your Journey
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
          Connect with travelers heading your way. Save money, reduce your carbon footprint,
          and make new friends along the way.
        </p>
        <div className="mt-10">
          <Search />
        </div>
      </div>
    </div>
  );
};