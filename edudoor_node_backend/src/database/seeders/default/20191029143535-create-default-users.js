const bcrypt = require('bcrypt');
const environment = require('../../../config/environment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash(
      'openolat',
      process.env.BCRYPT_PASSWORD_SALT || environment.BCRYPT_PASSWORD_SALT
    );
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'administrator',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'gitaumoses4@gmail.com',
        organizationId: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
