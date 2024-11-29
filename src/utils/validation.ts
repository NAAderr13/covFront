// Email validation using a standard regex pattern
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation allowing various international formats
export const validatePhone = (phone: string): boolean => {
  // Allows formats like: +1 (234) 567-8900, 1234567890, +12345678900
  const phoneRegex = /^(\+?\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Tunisian license plate validation (format: XXX-TUN-XXXX)
export const validateLicensePlate = (plate: string): boolean => {
  const plateRegex = /^\d{1,3}-TUN-\d{1,4}$/;
  return plateRegex.test(plate);
};