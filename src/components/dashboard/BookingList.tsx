import React from 'react';
import { mockRides } from '../../utils/mockData';
import { Clock, MapPin, User } from 'lucide-react';

export const BookingList = () => {
  const bookings = mockRides.map(ride => ({
    id: `booking-${ride.id}`,
    ride,
    status: 'confirmed' as const,
    seats: 1,
    createdAt: '2024-03-10',
  }));

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={booking.ride.driver.avatar}
                alt={booking.ride.driver.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{booking.ride.driver.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {booking.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">
                €{booking.ride.price * booking.seats}
              </p>
              <p className="text-sm text-gray-500">{booking.seats} seat(s)</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-gray-700">
                  {new Date(booking.ride.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500">{booking.ride.time}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-1" />
              <div className="ml-3">
                <p className="text-gray-700">{booking.ride.origin}</p>
                <p className="text-gray-700">{booking.ride.destination}</p>
              </div>
            </div>

            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="text-gray-700">
                  {booking.ride.vehicle.make} {booking.ride.vehicle.model} •{' '}
                  {booking.ride.vehicle.color}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              Contact Driver
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
              Cancel Booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};