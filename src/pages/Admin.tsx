import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, Download, Edit2, Trash2 } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import AdminRidesPage from '../components/admin/AdminRidesPage';  // Importation de la page des trajets

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: '', email: '', password: '' });
  const [showRidesPage, setShowRidesPage] = useState<boolean>(false);  // Nouvel état pour gérer l'affichage de la page des trajets
  
  const navigate = useNavigate();  // Hook de redirection
  
  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/user/get');
      setUsers(response.data);
    } catch (err) {
      setError('Erreur de récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();  // Appeler la fonction pour récupérer les utilisateurs au montage du composant
  }, []);

  // Fonction pour ajouter un utilisateur
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/add', newUser);
      // Après ajout, on récupère à nouveau la liste des utilisateurs
      await fetchUsers();  // Rafraîchit la liste des utilisateurs
      setShowUserForm(false);  // Fermer le formulaire
      setNewUser({ id: 0, name: '', email: '', password: '' });  // Réinitialiser le formulaire
      navigate('/admin');  // Redirection vers la page d'administration
    } catch (err) {
      setError('Erreur d\'ajout de l\'utilisateur');
    }
  };

  // Fonction pour éditer un utilisateur
  const handleEditUser = (user: User) => {
    setNewUser(user);  // Charger les données de l'utilisateur pour modification
    setShowUserForm(true);  // Afficher le formulaire de modification
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (user: User) => {
    try {
      await axios.delete(`http://localhost:8080/user/delete/${user.id}`);
      // Après suppression, on récupère à nouveau la liste des utilisateurs
      await fetchUsers();  // Rafraîchit la liste des utilisateurs
    } catch (err) {
      setError('Erreur de suppression de l\'utilisateur');
    }
  };

  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Liste des utilisateurs sans filtrage par statut
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowUserForm(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add User
            </button>
            <button
              onClick={() => setShowRidesPage(true)}  // Affiche la page des trajets
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-5 w-5 mr-2" />
              Manage Rides
            </button>
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
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

      {/* Affichage de la page AdminRidesPage si l'état est activé */}
      {showRidesPage && <AdminRidesPage />}  {/* Page des trajets */}
      
      {/* Formulaire d'ajout d'utilisateur */}
      {showUserForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium">Add New User</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="mt-4 p-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="mt-4 p-2 border border-gray-300 rounded-md w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="mt-4 p-2 border border-gray-300 rounded-md w-full"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowUserForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
