module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'administrator',
        password: 'openolat',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'gitaumoses4@gmail.com',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
