module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [
      {
        id: 'rmLHSfxI8VJGO3MC7j0h_6YdQ9',
        description:
          'The default organization for the application. A user from this organization can access all other organizations',
        name: 'Root',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organizations', {});
  },
};
