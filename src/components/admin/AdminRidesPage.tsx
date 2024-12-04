import React, { useState, useEffect } from 'react';

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

const AdminRidesPage: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [updatedRide, setUpdatedRide] = useState<Ride | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/rides/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setRides(rides.filter(ride => ride.id !== id));
        alert('Ride deleted successfully!');
      } else {
        throw new Error('Failed to delete ride');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdate = (ride: Ride) => {
    setSelectedRide(ride);
    setUpdatedRide(ride);  // Initialiser le formulaire avec les données actuelles
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!updatedRide) return;

    try {
      const response = await fetch(`http://localhost:8080/api/rides/update/${updatedRide.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRide),
      });

      if (response.ok) {
        setRides(rides.map(ride => (ride.id === updatedRide.id ? updatedRide : ride)));
        setSelectedRide(null);  // Fermer le formulaire après la mise à jour
        alert('Ride updated successfully!');
      } else {
        throw new Error('Failed to update ride');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Admin - Available Rides</h1>

      {loading && <div className="text-xl text-gray-500">Loading rides...</div>}
      {error && <div className="text-red-500 text-xl">{error}</div>}

      {!loading && !error && rides.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">Origin</th>
                <th className="px-4 py-2 text-left text-gray-700">Destination</th>
                <th className="px-4 py-2 text-left text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-gray-700">Time</th>
                <th className="px-4 py-2 text-left text-gray-700">Seats</th>
                <th className="px-4 py-2 text-left text-gray-700">Price</th>
                <th className="px-4 py-2 text-left text-gray-700">Rules</th>
                <th className="px-4 py-2 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{ride.origin}</td>
                  <td className="px-4 py-2">{ride.destination}</td>
                  <td className="px-4 py-2">{ride.date}</td>
                  <td className="px-4 py-2">{ride.time}</td>
                  <td className="px-4 py-2">{ride.seats}</td>
                  <td className="px-4 py-2">{ride.price}</td>
                  <td className="px-4 py-2">{ride.rules}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleUpdate(ride)} className="bg-blue-500 text-white px-3 py-1 rounded-lg">Update</button>
                    <button onClick={() => handleDelete(ride.id)} className="bg-red-500 text-white px-3 py-1 ml-2 rounded-lg">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRide && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Update Ride</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              value={updatedRide?.origin || ''}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, origin: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Origin"
            />
            <input
              type="text"
              value={updatedRide?.destination || ''}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, destination: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Destination"
            />
            <input
              type="date"
              value={updatedRide?.date || ''}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="time"
              value={updatedRide?.time || ''}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, time: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              value={updatedRide?.seats || 0}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, seats: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Seats"
            />
            <input
              type="number"
              value={updatedRide?.price || 0}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, price: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Price"
            />
            <input
              type="text"
              value={updatedRide?.rules || ''}
              onChange={(e) => setUpdatedRide({ ...updatedRide!, rules: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Rules"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminRidesPage;
