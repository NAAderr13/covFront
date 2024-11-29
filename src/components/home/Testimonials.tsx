import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular Commuter',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    quote: 'RideShare has transformed my daily commute. I save money and meet great people!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Weekend Traveler',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    quote: 'Perfect for weekend trips. The platform is easy to use and reliable.',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    quote: 'As a student, this is the most affordable way to travel between cities.',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 transform hover:scale-105 transition-transform"
            >
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};