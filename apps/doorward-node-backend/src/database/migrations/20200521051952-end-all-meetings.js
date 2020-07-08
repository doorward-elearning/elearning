'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`UPDATE "Meetings" SET "status" = 'ENDED'`);
  },

  down: async (queryInterface, Sequelize) => {},
};
