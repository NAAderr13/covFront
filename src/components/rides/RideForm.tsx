import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Users, DollarSign } from 'lucide-react';
import axios from 'axios'; // Importer axios

export const RideForm = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: '',
    price: '',
    rules: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fonction de validation du formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.origin) newErrors.origin = 'Starting location is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.seats) newErrors.seats = 'Number of seats is required';
    if (!formData.price) newErrors.price = 'Price per seat is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/rides/create', formData);

        if (response.status === 200) {
          alert('Ride successfully created');
          
          // Réinitialiser le formulaire après une soumission réussie
          setFormData({
            origin: '',
            destination: '',
            date: '',
            time: '',
            seats: '',
            price: '',
            rules: '',
          });

          // Optionnel : Réinitialiser les erreurs aussi
          setErrors({});
        } else {
          alert('Error: ' + response.data);
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('There was an error submitting your ride.');
      }
    }
  };

  // Gestionnaire de changement des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Nettoyer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
      {/* Origin and Destination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            Starting Location
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.origin && <span className="text-red-500 text-sm">{errors.origin}</span>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 mr-2" />
            Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.destination && <span className="text-red-500 text-sm">{errors.destination}</span>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="h-4 w-4 mr-2" />
            Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
        </div>
      </div>

      {/* Seats and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Users className="h-4 w-4 mr-2" />
            Available Seats
          </label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            min="1"
            max="8"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.seats && <span className="text-red-500 text-sm">{errors.seats}</span>}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="h-4 w-4 mr-2" />
            Price per Seat
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
        </div>
      </div>

      {/* Additional Rules */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Rules or Notes
        </label>
        <textarea
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          rows={4}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="E.g., No smoking, pets allowed, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Publish Ride
      </button>
    </form>
  );
};
