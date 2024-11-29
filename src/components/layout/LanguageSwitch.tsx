import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      <Globe className="h-5 w-5" />
      <span className="text-sm font-medium">
        {language === 'fr' ? 'EN' : 'FR'}
      </span>
    </button>
  );
};