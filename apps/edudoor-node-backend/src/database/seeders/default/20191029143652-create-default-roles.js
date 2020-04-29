const defaultRoles = require('../../../config/defaultRoles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const organizations = await queryInterface.sequelize.query(
      'SELECT id FROM "Organizations" WHERE name = \'Edudoor\''
    );
    const organizationId = organizations[0][0].id;
    await queryInterface.bulkInsert('Roles', defaultRoles(organizationId));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
