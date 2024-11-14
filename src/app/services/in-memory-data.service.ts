import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Phone } from '../models/phone';

export class InMemoryDataService implements InMemoryDbService {
  //returns an object with a students property,
  // which is an array of User objects
  createDb():{contents: Phone[]} {
    /*
    Inside the method, a constant array named students is defined,
    containing several User objects. Each User object represents a
    student with properties such as id, firstName, lastName,
     department, and isAdmin. For example, one of the User objects is
     */
    const contents: Phone[] = [
      { id: 1, brand: 'Apple', name: 'iPhone 14', colour: 'Black',budget:123456.78,  typec: true },
      { id: 2, brand: 'Samsung', name: 'Galaxy S21', colour: 'Silver', budget:23456.78, typec: true },
      { id: 3, brand: 'Google', name: 'Pixel 7', colour: 'White', budget:3456.78,  typec: true },
      { id: 4, brand: 'OnePlus', name: '9 Pro', colour: 'Green',budget:456.78,  typec: true }
    ];
    return { contents };
  }
}
