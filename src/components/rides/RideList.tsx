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

// Composant RideCard pour afficher un trajet individuel
const RideCard: React.FC<{ ride: Ride }> = ({ ride }) => {
  const reserveRide = async () => {
    try {
      // Données de réservation à envoyer au serveur
      const reservationData = {
        rideId: ride.id,            // L'ID du trajet
        userId: 1,                  // ID utilisateur en dur pour l'exemple
        date: ride.date,            // Date du trajet
        destination: ride.destination, // Destination
        origin: ride.origin,        // Origine
        price: ride.price,          // Prix
        rules: ride.rules,          // Règles
        seats: ride.seats,          // Nombre de sièges
        time: ride.time             // Heure du trajet
      };

      // Envoi de la requête de réservation
      const response = await fetch('http://localhost:8080/api/reservations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),  // Envoi de toutes les informations dans le corps de la requête
      });

      if (!response.ok) throw new Error('Erreur lors de la réservation');

      alert('Trajet réservé avec succès !');
    } catch (error) {
      console.error('Erreur de réservation:', error);
      alert('La réservation a échoué.');
    }
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-800 mb-3 truncate">
        {ride.origin} → {ride.destination}
      </h3>
      <p className="text-sm text-gray-600"><strong>Date:</strong> {ride.date}</p>
      <p className="text-sm text-gray-600"><strong>Time:</strong> {ride.time}</p>
      <p className="text-sm text-gray-600"><strong>Seats:</strong> {ride.seats}</p>
      <p className="text-sm text-gray-600"><strong>Price:</strong> ${ride.price}</p>
      <p className="text-sm text-gray-600"><strong>Rules:</strong> {ride.rules || "None specified"}</p>
      <button
        onClick={reserveRide}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Réserver
      </button>
    </div>
  );
};

// Composant principal pour la liste des trajets
export const RideList: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Charger les trajets dès le montage
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rides/getall');

        if (!response.ok) throw new Error('Failed to fetch rides');

        const data = await response.json();
        setRides(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Rides</h1>

      {loading && (
        <div className="flex justify-center items-center text-gray-500">
          <p>Loading rides...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-500 rounded p-4 mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && rides.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}

      {!loading && !error && rides.length === 0 && (
        <div className="text-center text-gray-600">
          <p>No rides available at the moment.</p>
        </div>
      )}
    </div>
  );
};
