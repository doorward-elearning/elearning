const bcrypt = require('bcrypt');
const id = require('../../../utils/generateId');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASSWORD,
      +(process.env.BCRYPT_PASSWORD_SALT || process.env.BCRYPT_PASSWORD_SALT)
    );
    await queryInterface.bulkInsert('Users', [
      {
        id: process.env.DEFAULT_ADMIN_ID,
        username: process.env.DEFAULT_ADMIN_USERNAME,
        password,
        status: 'ACTIVE_NOT_DELETABLE',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: process.env.DEFAULT_ADMIN_EMAIL,
        organizationId: process.env.DEFAULT_ORGANIZATION_ID,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
