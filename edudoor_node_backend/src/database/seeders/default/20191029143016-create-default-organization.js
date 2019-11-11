const shortid = require('shortid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [
      {
        id: shortid.generate(),
        description:
          'The default organization for the application. ' +
          'It is assigned to users that do not have any specific organization',
        name: 'Edudoor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organizations', {});
  },
};
