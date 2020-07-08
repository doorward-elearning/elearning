'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'link', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: true,
    });
    await queryInterface.addColumn('Organizations', 'darkThemeIcon', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'link');
    await queryInterface.removeColumn('Organizations', 'darkThemeIcon');
  },
};
