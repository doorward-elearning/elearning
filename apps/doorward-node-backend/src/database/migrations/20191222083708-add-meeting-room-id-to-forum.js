module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Forums', 'meetingRoomId', {
      type: Sequelize.STRING,
      onDelete: 'cascade',
      references: {
        model: 'MeetingRooms',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Forums', 'Forums_meetingRoomId_fkey');
  },
};
