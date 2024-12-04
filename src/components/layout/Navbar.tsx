import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RideShare</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/find" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              {t('findRide')}
            </Link>
            <Link to="/offer" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              {t('offerRide')}
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              {t('dashboard')}
            </Link>
            <Link to="/reservations" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              {t('ReservationList')}
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
              <Settings className="h-5 w-5" />
            </Link>
            <Link
              to="/signin"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Se connecter
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md border border-indigo-600 hover:bg-indigo-50"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};