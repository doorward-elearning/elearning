'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Organizations', 'meetingPlatform', {
      type: Sequelize.ENUM('Openvidu', 'Jitsi'),
      defaultValue: 'Openvidu',
      nullable: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Organizations', 'meetingPlatform');
  },
};
