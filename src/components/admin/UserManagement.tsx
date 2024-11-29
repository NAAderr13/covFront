import React, { useState } from 'react';
import { Search, Download, Edit2, Trash2, UserPlus } from 'lucide-react';
import { UserFormDialog } from './dialogs/UserFormDialog';
import { ConfirmDialog } from './dialogs/ConfirmDialog';

const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', status: 'blocked' },
];

export const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const handleUserSubmit = (formData: any) => {
    console.log('User form submitted:', formData);
    setShowUserForm(false);
    setSelectedUser(null);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      console.log('Deleting user:', selectedUser.id);
      setShowDeleteConfirm(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 flex-1">
            <div className="max-w-xs w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowUserForm(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add User
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
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
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                    ${user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${user.status === 'blocked' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserFormDialog
        isOpen={showUserForm}
        user={selectedUser}
        onClose={() => {
          setShowUserForm(false);
          setSelectedUser(null);
        }}
        onSubmit={handleUserSubmit}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDeleteUser}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
};