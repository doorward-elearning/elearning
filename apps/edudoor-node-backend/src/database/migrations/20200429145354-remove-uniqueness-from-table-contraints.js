'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'username', {
      unique: false,
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeConstraint('Users', 'Users_username_key');
    await queryInterface.changeColumn('Users', 'email', {
      unique: false,
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeConstraint('Users', 'Users_email_key');
    await queryInterface.changeColumn('Organizations', 'name', {
      unique: true,
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {},
};
