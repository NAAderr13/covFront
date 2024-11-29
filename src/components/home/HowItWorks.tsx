import React from 'react';
import { Search, Car, Users, CreditCard } from 'lucide-react';

const steps = [
  {
    title: 'Search',
    description: 'Enter your destination and travel date to find available rides.',
    icon: Search,
  },
  {
    title: 'Choose',
    description: 'Browse through available rides and select the one that suits you best.',
    icon: Car,
  },
  {
    title: 'Book',
    description: 'Book your ride instantly and connect with your driver.',
    icon: Users,
  },
  {
    title: 'Pay',
    description: 'Make secure payments through our platform.',
    icon: CreditCard,
  },
];

export const HowItWorks = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Getting started is easy - find your ride in just a few steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mx-auto">
                  <step.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{step.title}</h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};