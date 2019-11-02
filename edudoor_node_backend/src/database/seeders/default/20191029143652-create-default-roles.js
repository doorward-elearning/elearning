const roles = require('../../../utils/roles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const organizations = await queryInterface.sequelize.query(
      'SELECT id FROM "Organizations" WHERE name = \'Edudoor\''
    );
    const organizationId = organizations[0][0].id;
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: roles.SUPER_ADMINISTRATOR,
        description: 'The system administrator who is responsible for all functions in the application',
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: roles.TEACHER,
        description: 'A user who can manage courses, modules and other resources',
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: roles.STUDENT,
        description: 'A learner in the system',
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
