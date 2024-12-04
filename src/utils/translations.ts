export const translations = {
  // Navigation
  home: 'Accueil',
  aboutUs: 'À Propos',
  offerRide: 'Proposer un Trajet',
  findRide: 'Trouver un Trajet',
  dashboard: 'Tableau de Bord',
  admin: 'Administration',
  signIn: 'Se Connecter',

  // Search
  searchRides: 'Rechercher des Trajets',
  departureCity: 'Ville de départ',
  destinationCity: 'Ville d\'arrivée',
  selectDeparture: 'Sélectionner la ville de départ',
  selectDestination: 'Sélectionner la ville d\'arrivée',
  date: 'Date',
  search: 'Rechercher',

  // Ride Form
  startingLocation: 'Lieu de départ',
  destination: 'Destination',
  time: 'Heure',
  vehicleInfo: 'Informations du véhicule',
  make: 'Marque',
  model: 'Modèle',
  year: 'Année',
  color: 'Couleur',
  licensePlate: 'Plaque d\'immatriculation',
  availableSeats: 'Places disponibles',
  pricePerSeat: 'Prix par place (TND)',
  additionalRules: 'Règles supplémentaires',
  publishRide: 'Publier le trajet',

  // Filters
  filters: 'Filtres',
  departureTime: 'Heure de départ',
  priceRange: 'Fourchette de prix',
  seatsNeeded: 'Places nécessaires',
  arrivalTime: 'Heure d\'arrivée',
  applyFilters: 'Appliquer les filtres',

  // Time slots
  anyTime: 'N\'importe quand',
  morning: 'Matin (6h - 12h)',
  afternoon: 'Après-midi (12h - 18h)',
  evening: 'Soir (18h - 00h)',

  // Booking
  bookNow: 'Réserver maintenant',
  seatsLeft: 'places restantes',
  contactDriver: 'Contacter le conducteur',
  cancelBooking: 'Annuler la réservation',
  confirmBooking: 'Confirmer la réservation',
  bookingDetails: 'Détails de la réservation',
  firstName: 'Prénom',
  lastName: 'Nom',
  phoneNumber: 'Numéro de téléphone',
  emailAddress: 'Adresse email',

  // Admin
  userManagement: 'Gestion des utilisateurs',
  rideManagement: 'Gestion des trajets',
  addUser: 'Ajouter un utilisateur',
  editUser: 'Modifier l\'utilisateur',
  deleteUser: 'Supprimer l\'utilisateur',
  confirmDelete: 'Confirmer la suppression',
  status: 'Statut',
  active: 'Actif',
  inactive: 'Inactif',
  blocked: 'Bloqué',
  searchUsers: 'Rechercher des utilisateurs',
  exportData: 'Exporter les données',
  allUsers: 'Tous les utilisateurs',
  viewDetails: 'Voir les détails',
  cancelRide: 'Annuler le trajet',
  rideDetails: 'Détails du trajet',

  // Common
  loading: 'Chargement...',
  error: 'Erreur',
  success: 'Succès',
  cancel: 'Annuler',
  save: 'Enregistrer',
  confirm: 'Confirmer',
  edit: 'Modifier',
  delete: 'Supprimer',
  actions: 'Actions',
  details: 'Détails',
  name: 'Nom',
  email: 'Email',
  phone: 'Téléphone',
  submit: 'Soumettre',
  close: 'Fermer',

  ReservationList: 'Liste des réservations',
};

// Currency formatter
export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)} TND`;
};