// mockPhone.data.ts
// import the interface
import { Phone } from '../models/phone';


// Create a mock data array of type Phone and export so it is
// available to other files

export const phoneList: Phone[] = [
  { id: 1, brand: 'Apple', name: 'iPhone 14', colour: 'Black', type: 'Smartphone', typec: true },
  { id: 2, brand: 'Samsung', name: 'Galaxy S21', colour: 'Silver', type: 'Smartphone', typec: true },
  { id: 3, brand: 'Google', name: 'Pixel 7', colour: 'White', type: 'Smartphone', typec: true },
  { id: 4, brand: 'OnePlus', name: '9 Pro', colour: 'Green', type: 'Smartphone', typec: true }
  // Add more as needed
];
