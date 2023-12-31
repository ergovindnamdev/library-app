import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  contact: faker.phone.number(),
  status: sample(['active', 'archived']),
  role: sample([
    'Admin',
    'user',
  ]),
}));
