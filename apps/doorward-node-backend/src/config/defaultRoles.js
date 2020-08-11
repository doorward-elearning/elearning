const generateId = require('../utils/generateId');
const roles = require('../utils/roles');

const defaultRoles = organizationId => [
  {
    id: generateId(),
    name: roles.SUPER_ADMINISTRATOR,
    description: 'The system administrator who is responsible for all functions in the application',
    organizationId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    name: roles.MODERATOR,
    description: 'A user who can manage conferences, modules and other resources',
    organizationId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: generateId(),
    name: roles.MEMBER,
    description: 'A learner in the system',
    organizationId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = defaultRoles;
