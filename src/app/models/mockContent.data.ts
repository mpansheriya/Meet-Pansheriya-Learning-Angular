// mockPhone.data.ts
// import the interface
import { Phone } from '../models/phone';


// Create a mock data array of type Phone and export so it is
// available to other files

export const phoneList: Phone[] = [
  { id: 1, brand: 'Apple', name: 'iPhone 14', colour: 'Black',  typec: true },
  { id: 2, brand: 'Samsung', name: 'Galaxy S21', colour: 'Silver',  typec: true },
  { id: 3, brand: 'Google', name: 'Pixel 7', colour: 'White',  typec: true },
  { id: 4, brand: 'OnePlus', name: '9 Pro', colour: 'Green',  typec: true }
  // Add more as needed
];
