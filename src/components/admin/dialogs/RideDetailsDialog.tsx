import React from 'react';
import { X, MapPin, Calendar, Clock, Car, User, DollarSign } from 'lucide-react';
import type { Ride } from '../../../types';

interface RideDetailsDialogProps {
  ride: Ride;
  isOpen: boolean;
  onClose: () => void;
}

export const RideDetailsDialog = ({ ride, isOpen, onClose }: RideDetailsDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Ride Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center">
            <img
              src={ride.driver.avatar}
              alt={ride.driver.name}
              className="h-12 w-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{ride.driver.name}</h3>
              <p className="text-sm text-gray-500">Rating: {ride.driver.rating} ★</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                Route
              </h4>
              <div className="space-y-2">
                <p className="text-gray-900">{ride.origin}</p>
                {ride.stops.map((stop, index) => (
                  <p key={index} className="text-gray-500">↓ {stop}</p>
                ))}
                <p className="text-gray-900">{ride.destination}</p>
              </div>
            </div>

            <div>
              <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                Date & Time
              </h4>
              <p className="text-gray-900">{new Date(ride.date).toLocaleDateString()}</p>
              <p className="text-gray-500">{ride.time}</p>
            </div>

            <div>
              <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Car className="h-4 w-4 mr-2" />
                Vehicle
              </h4>
              <p className="text-gray-900">
                {ride.vehicle.make} {ride.vehicle.model} ({ride.vehicle.year})
              </p>
              <p className="text-gray-500">
                {ride.vehicle.color} • {ride.vehicle.licensePlate}
              </p>
            </div>

            <div>
              <h4 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 mr-2" />
                Seats & Price
              </h4>
              <p className="text-gray-900">{ride.availableSeats} seats available</p>
              <p className="flex items-center text-gray-900">
                <DollarSign className="h-4 w-4" />
                {ride.price} per seat
              </p>
            </div>
          </div>

          {ride.rules && ride.rules.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rules</h4>
              <ul className="list-disc list-inside space-y-1">
                {ride.rules.map((rule, index) => (
                  <li key={index} className="text-gray-500">{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};