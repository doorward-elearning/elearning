module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('MeetingRooms', 'type', {
      type: Sequelize.STRING,
      defaultValue: 'PRIVATE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropColumn('MeetingRooms', 'type');
  },
};
