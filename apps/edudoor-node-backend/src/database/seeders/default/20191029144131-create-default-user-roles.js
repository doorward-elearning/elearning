const { SUPER_ADMINISTRATOR } = require('../../../utils/roles');
const generateId = require('../../../utils/generateId');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(`SELECT id FROM "Roles" WHERE name = '${SUPER_ADMINISTRATOR}'`);
    await queryInterface.bulkInsert('UserRoles', [
      {
        id: generateId(),
        roleId: roles[0][0].id,
        userId: process.env.DEFAULT_ADMIN_ID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {});
  },
};
