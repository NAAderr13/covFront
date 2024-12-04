import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { TUNISIAN_CITIES } from '../../utils/constants';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const reserveRide = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const reservationData = {
        rideId: ride.id,
        userId: 1, // ID utilisateur en dur pour l'exemple
        date: ride.date,
        destination: ride.destination,
        origin: ride.origin,
        price: ride.price,
        rules: ride.rules,
        seats: ride.seats,
        time: ride.time
      };

      const response = await fetch('http://localhost:8080/api/reservations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) throw new Error('Erreur lors de la réservation');

      setSuccess(true);
    } catch (error) {
      setError('La réservation a échoué. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
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

      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">Trajet réservé avec succès !</div>}

      <button
        onClick={reserveRide}
        disabled={isLoading}
        className={`mt-4 px-4 py-2 rounded ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white hover:bg-blue-600`}
      >
        {isLoading ? 'Réservation en cours...' : 'Réserver'}
      </button>
    </div>
  );
};

export const Search = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [rides, setRides] = useState<Ride[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const searchUrl = `http://localhost:8080/api/rides/search?origin=${origin}&destination=${destination}&date=${date}`;

    try {
      const response = await fetch(searchUrl);

      if (response.ok) {
        const text = await response.text();
        if (!text) {
          setError('No rides found.');
          setRides([]);
          return;
        }

        const ridesData = JSON.parse(text);
        setRides(ridesData);
        setError('');
      } else {
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

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {rides.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Rides Found</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
