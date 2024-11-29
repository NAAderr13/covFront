import type { Ride, User, Vehicle } from '../types';

const mockDrivers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.9,
  },
];

const mockVehicles: Vehicle[] = [
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    color: 'Silver',
    licensePlate: 'ABC123',
  },
  {
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    color: 'Blue',
    licensePlate: 'XYZ789',
  },
];

export const mockRides: Ride[] = [
  {
    id: '1',
    driver: mockDrivers[0],
    origin: 'San Francisco, CA',
    destination: 'Los Angeles, CA',
    stops: ['San Jose', 'Fresno'],
    date: '2024-03-15',
    time: '08:00 AM',
    price: 45,
    availableSeats: 3,
    vehicle: mockVehicles[0],
    rules: ['No smoking', 'Pets allowed'],
  },
  {
    id: '2',
    driver: mockDrivers[1],
    origin: 'New York, NY',
    destination: 'Boston, MA',
    stops: ['Hartford'],
    date: '2024-03-16',
    time: '10:00 AM',
    price: 35,
    availableSeats: 2,
    vehicle: mockVehicles[1],
    rules: ['No eating in the car', 'Be on time'],
  },
];