import React, { useState, useEffect } from 'react';

interface Reservation {
  id: number;
  rideId: number;
  userId: number;
  date: string;
  destination: string;
  origin: string;
  price: number;
  rules: string;
  seats: number;
  time: string;
}

const ReservationCard: React.FC<{ reservation: Reservation, onUpdate: (id: number) => void, onDelete: (id: number) => void }> = ({ reservation, onUpdate, onDelete }) => {
  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {reservation.origin} → {reservation.destination}
      </h3>
      <p className="text-sm text-gray-600"><strong>Date:</strong> {reservation.date}</p>
      <p className="text-sm text-gray-600"><strong>Time:</strong> {reservation.time}</p>
      <p className="text-sm text-gray-600"><strong>Seats:</strong> {reservation.seats}</p>
      <p className="text-sm text-gray-600"><strong>Price:</strong> ${reservation.price}</p>
      <p className="text-sm text-gray-600"><strong>Rules:</strong> {reservation.rules || "None specified"}</p>
      <div className="mt-4 flex justify-between">
        <button onClick={() => onUpdate(reservation.id)} className="text-blue-600 hover:text-blue-800 transition duration-200">Edit</button>
        <button onClick={() => onDelete(reservation.id)} className="text-red-600 hover:text-red-800 transition duration-200">Delete</button>
      </div>
    </div>
  );
};

export const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/reservations/getall');

        if (!response.ok) throw new Error('Failed to fetch reservations');

        const data = await response.json();
        setReservations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Fonction pour mettre à jour une réservation
  const updateReservation = async (id: number) => {
    console.log('Update reservation with ID:', id);
    // Implémenter la logique de mise à jour ici, par exemple, ouvrir un formulaire de mise à jour
  };

  // Fonction pour supprimer une réservation
  const deleteReservation = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reservations/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete reservation');

      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Reservations</h1>

      {loading && <div className="text-xl text-gray-500">Loading reservations...</div>}

      {error && <div className="text-red-500 text-xl">{error}</div>}

      {!loading && !error && reservations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservations.map((reservation) => (
            <ReservationCard 
              key={reservation.id} 
              reservation={reservation} 
              onUpdate={updateReservation} 
              onDelete={deleteReservation} 
            />
          ))}
        </div>
      )}

      {!loading && !error && reservations.length === 0 && <div className="text-lg text-gray-500">No reservations found.</div>}
    </div>
  );
};
