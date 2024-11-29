import React, { useState } from 'react';
import { Plus, Calendar, Tag, Users, Trash2, Edit2 } from 'lucide-react';

export const OfferManagement = () => {
  const [showNewOffer, setShowNewOffer] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Active Promotions</h2>
        <button
          onClick={() => setShowNewOffer(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Offer
        </button>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Sample Offer Card */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Tag className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Spring Sale</h3>
                <p className="text-sm text-gray-500">20% off on all rides</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-indigo-600 hover:text-indigo-900">
                <Edit2 className="h-5 w-5" />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Valid until March 31, 2024
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-2" />
              Used by 145 users
            </div>
            <div className="text-sm text-gray-500">
              Code: SPRING24
            </div>
          </div>

          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    Usage: 58%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    145/250 used
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: '58%' }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewOffer && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Offer</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Offer Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Spring Sale"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Usage Limit</label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="250"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewOffer(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};