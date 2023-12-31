import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const library_trans = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  book: faker.person.fullName(),
  due_date: faker.date.future(),
  status: sample(['available', 'booked']),
}));
