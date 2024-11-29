import React from 'react';
import { RideForm } from '../components/rides/RideForm';
import { useLanguage } from '../contexts/LanguageContext';

export const OfferRide = () => {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('offerRide')}</h1>
      <RideForm />
    </div>
  );
};