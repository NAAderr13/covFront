import React, { useState, useEffect } from 'react';

// Définir le type Ride pour les trajets
interface Ride {
  id: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  rules: string;
}

const RideCard: React.FC<{ ride: Ride }> = ({ ride }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {ride.origin} to {ride.destination}
      </h3>
      <p><strong>Date:</strong> {ride.date}</p>
      <p><strong>Time:</strong> {ride.time}</p>
      <p><strong>Seats Available:</strong> {ride.seats}</p>
      <p><strong>Price:</strong> ${ride.price}</p>
      <p><strong>Rules:</strong> {ride.rules}</p>
    </div>
  );
};

export const RideList: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]); // Liste des trajets
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string>(''); // Gestion des erreurs

  // Utilisation de useEffect pour charger les trajets dès que le composant est monté
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rides/getall'); // Requête GET vers l'API

        if (response.ok) {
          const data = await response.json(); // Convertir la réponse en JSON
          setRides(data); // Mettre à jour l'état des trajets
        } else {
          throw new Error('Failed to fetch rides'); // Gérer les erreurs de requête
        }
      } catch (err: any) {
        setError('Error fetching data: ' + err.message); // Afficher une erreur si la requête échoue
      } finally {
        setLoading(false); // Terminer le chargement une fois la réponse reçue
      }
    };

    fetchRides();
  }, []); // [] signifie que l'effet s'exécute au montage du composant uniquement

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Rides</h1>

      {/* Afficher un message de chargement */}
      {loading && (
        <div className="text-center text-gray-500">
          <p>Loading rides...</p>
        </div>
      )}

      {/* Afficher les erreurs, s'il y en a */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Afficher la liste des trajets si elle est disponible */}
      {!loading && !error && rides.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}

      {/* Afficher un message si aucun trajet n'est trouvé */}
      {!loading && !error && rides.length === 0 && (
        <div className="text-center text-gray-500">
          <p>No rides available at the moment.</p>
        </div>
      )}
    </div>
  );
};
