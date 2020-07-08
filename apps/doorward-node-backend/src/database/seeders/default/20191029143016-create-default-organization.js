module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [
      {
        id: process.env.DEFAULT_ORGANIZATION_ID,
        description:
          'The default organization for the application. A user from this organization can access all other organizations',
        name: process.env.DEFAULT_ORGANIZATION_NAME,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Organizations', {});
  },
};
