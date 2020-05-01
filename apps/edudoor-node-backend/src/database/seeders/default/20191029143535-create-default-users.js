const bcrypt = require('bcrypt');
const id = require('../../../utils/generateId');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash(
      'openolat',
      +(process.env.BCRYPT_PASSWORD_SALT || process.env.BCRYPT_PASSWORD_SALT)
    );
    const organizations = await queryInterface.sequelize.query(
      'SELECT id FROM "Organizations" WHERE name = \'Root\''
    );
    await queryInterface.bulkInsert('Users', [
      {
        id: id(),
        username: 'administrator',
        password,
        status: 'ACTIVE_NOT_DELETABLE',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'gitaumoses4@gmail.com',
        organizationId: organizations[0][0].id,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
