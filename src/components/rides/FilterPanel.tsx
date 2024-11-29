import React from 'react';
import { MapPin } from 'lucide-react';
import { TUNISIAN_CITIES } from '../../utils/constants';

export const FilterPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtres</h2>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            Ville de départ
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Toutes les villes</option>
            {TUNISIAN_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            Destination
          </label>
          <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option value="">Toutes les villes</option>
            {TUNISIAN_CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
};