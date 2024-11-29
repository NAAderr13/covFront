import React, { useState } from 'react';
import { User, Mail, Phone, Shield } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Profile = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-8">
        <img
          src={profile.avatar}
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-gray-500">Membre depuis 2024</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="h-4 w-4 mr-2" />
            {t('name')}
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="h-4 w-4 mr-2" />
            {t('email')}
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Phone className="h-4 w-4 mr-2" />
            {t('phone')}
          </label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {t('save')}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center text-gray-500">
          <Shield className="h-5 w-5 mr-2" />
          <p>Vos informations sont stockées en toute sécurité et ne sont jamais partagées sans votre autorisation.</p>
        </div>
      </div>
    </div>
  );
};