// Common types used across the application
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
}

export interface Ride {
  id: string;
  driver: User;
  origin: string;
  destination: string;
  stops: string[];
  date: string;
  time: string;
  price: number;
  availableSeats: number;
  vehicle: Vehicle;
  rules?: string[];
}

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
}

export interface Booking {
  id: string;
  ride: Ride;
  passenger: User;
  seats: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}