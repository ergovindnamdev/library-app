import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const books = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  author: faker.person.fullName(),
  status: sample(['available', 'booked']),
}));
