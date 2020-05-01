const defaultRoles = require('../../../config/defaultRoles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', defaultRoles(process.env.DEFAULT_ORGANIZATION_ID));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
