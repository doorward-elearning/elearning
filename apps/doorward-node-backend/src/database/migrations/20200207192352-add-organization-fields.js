'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Organizations', 'icon', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Organizations', 'icon');
  },
};
