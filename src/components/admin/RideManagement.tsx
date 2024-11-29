import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign } from 'lucide-react';
import { RideDetailsDialog } from './dialogs/RideDetailsDialog';
import { ConfirmDialog } from './dialogs/ConfirmDialog';
import { mockRides } from '../../utils/mockData';

export const RideManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRide, setSelectedRide] = useState<typeof mockRides[0] | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleViewDetails = (ride: typeof mockRides[0]) => {
    setSelectedRide(ride);
    setShowDetailsDialog(true);
  };

  const handleCancelRide = (ride: typeof mockRides[0]) => {
    setSelectedRide(ride);
    setShowCancelDialog(true);
  };

  const confirmCancelRide = () => {
    if (selectedRide) {
      console.log('Cancelling ride:', selectedRide.id);
      setShowCancelDialog(false);
      setSelectedRide(null);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="max-w-xs w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Rides</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockRides.map((ride) => (
              <tr key={ride.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={ride.driver.avatar}
                      alt={ride.driver.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {ride.driver.name}
                      </div>
                      <div className="text-sm text-gray-500">★ {ride.driver.rating}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{ride.origin}</div>
                  <div className="text-sm text-gray-500">{ride.destination}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(ride.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{ride.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">€{ride.price}</div>
                  <div className="text-sm text-gray-500">
                    {ride.availableSeats} seats left
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(ride)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleCancelRide(ride)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Cancel Ride
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRide && (
        <>
          <RideDetailsDialog
            ride={selectedRide}
            isOpen={showDetailsDialog}
            onClose={() => {
              setShowDetailsDialog(false);
              setSelectedUser(null);
            }}
          />

          <ConfirmDialog
            isOpen={showCancelDialog}
            title="Cancel Ride"
            message="Are you sure you want to cancel this ride? This action cannot be undone."
            confirmLabel="Cancel Ride"
            onConfirm={confirmCancelRide}
            onCancel={() => {
              setShowCancelDialog(false);
              setSelectedRide(null);
            }}
          />
        </>
      )}
    </div>
  );
};