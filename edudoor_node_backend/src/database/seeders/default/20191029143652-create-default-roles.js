const roles = require('../../../utils/roles');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: roles.SUPER_ADMINISTRATOR,
        description: 'The system administrator who is responsible for all functions in the application',
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: roles.TEACHER,
        description: 'A user who can manage courses, modules and other resources',
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: roles.STUDENT,
        description: 'A learner in the system',
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
