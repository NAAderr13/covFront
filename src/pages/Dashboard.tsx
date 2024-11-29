import React from 'react';
import { Profile } from '../components/dashboard/Profile';
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('dashboard')}</h1>
      <Profile />
    </div>
  );
};