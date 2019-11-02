const { SUPER_ADMINISTRATOR } = require('../../../utils/roles');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const administrators = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE username = \'administrator\''
    );
    const roles = await queryInterface.sequelize.query(`SELECT id FROM "Roles" WHERE name = '${SUPER_ADMINISTRATOR}'`);
    await queryInterface.bulkInsert('UserRoles', [
      {
        roleId: roles[0][0].id,
        userId: administrators[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {});
  },
};
