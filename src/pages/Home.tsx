import React from 'react';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { Testimonials } from '../components/home/Testimonials';

export const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};