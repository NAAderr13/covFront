import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { TUNISIAN_CITIES } from '../../utils/constants';

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

export const Search = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [rides, setRides] = useState<Ride[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construire l'URL pour appeler l'API
    const searchUrl = `http://localhost:8080/api/rides/search?origin=${origin}&destination=${destination}&date=${date}`;

    try {
      const response = await fetch(searchUrl);

      if (response.ok) {
        // Vérifier si la réponse est vide
        const text = await response.text();
        if (!text) {
          setError('No rides found.');
          setRides([]);
          return;
        }

        // Essayer de convertir la réponse en JSON
        const ridesData = JSON.parse(text);
        setRides(ridesData);
        setError('');  // Réinitialiser l'erreur
      } else {
        // Si la réponse n'est pas correcte
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
        setRides([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data: ' + error);
      setRides([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select departure city</option>
              {TUNISIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select destination city</option>
              {TUNISIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Afficher les erreurs */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Afficher les résultats */}
      {rides.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Rides Found</h3>
          <ul className="list-disc ml-4">
            {rides.map((ride) => (
              <li key={ride.id} className="mt-2">
                <div><strong>Origin:</strong> {ride.origin}</div>
                <div><strong>Destination:</strong> {ride.destination}</div>
                <div><strong>Date:</strong> {ride.date}</div>
                <div><strong>Time:</strong> {ride.time}</div>
                <div><strong>Seats:</strong> {ride.seats}</div>
                <div><strong>Price:</strong> ${ride.price}</div>
                <div><strong>Rules:</strong> {ride.rules}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
