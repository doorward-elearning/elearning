module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRoles', [
      {
        id: 1,
        roleId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRoles', null, {});
  },
};
