export const TUNISIAN_CITIES = [
  'Tunis',
  'Sfax',
  'Sousse',
  'Kairouan',
  'Bizerte',
  'Gabès',
  'Ariana',
  'Gafsa',
  'Monastir',
  'Ben Arous',
  'Kasserine',
  'Médenine',
  'Nabeul',
  'Tataouine',
  'Béja',
  'Kef',
  'Mahdia',
  'Sidi Bouzid',
  'Jendouba',
  'Tozeur',
  'Manouba',
  'Siliana',
  'Zaghouan',
  'Kebili'
];

export const VEHICLE_MAKES = {
  'Volkswagen': ['Golf', 'Passat', 'Polo', 'Tiguan', 'Touareg', 'Arteon'],
  'Audi': ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'RS6', 'TT'],
  'Mercedes': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE'],
  'BMW': ['1 Series', '3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'M3', 'M5'],
  'Toyota': ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Yaris', 'Hilux'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'HR-V', 'Jazz'],
  'Hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Santa Fe', 'Accent'],
  'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento'],
  'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Talisman'],
  'Peugeot': ['208', '308', '3008', '5008', '508']
} as const;

export const VEHICLE_COLORS = [
  'Black',
  'White',
  'Silver',
  'Gray',
  'Red',
  'Blue',
  'Green',
  'Brown',
  'Beige',
  'Gold',
  'Orange',
  'Yellow'
] as const;

// Generate years from 1990 to current year
const currentYear = new Date().getFullYear();
export const VEHICLE_YEARS = Array.from(
  { length: currentYear - 1990 + 1 },
  (_, i) => (currentYear - i).toString()
);

export const LICENSE_PLATE_REGEX = /^\d{1,3}-TUN-\d{1,4}$/;

export type VehicleMake = keyof typeof VEHICLE_MAKES;
export type VehicleModel<T extends VehicleMake> = typeof VEHICLE_MAKES[T][number];
export type VehicleColor = typeof VEHICLE_COLORS[number];