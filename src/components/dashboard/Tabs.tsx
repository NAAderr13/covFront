import React from 'react';
import { User } from 'lucide-react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <Icon className="h-5 w-5 mr-2" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};