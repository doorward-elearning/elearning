const shortid = require('shortid');

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [
      {
        id: 'rmLHSfxI8VJGO3MC7j0h_6YdQ9',
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
