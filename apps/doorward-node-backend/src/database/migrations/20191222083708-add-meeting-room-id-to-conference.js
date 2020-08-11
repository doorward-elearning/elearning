module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Conferences', 'meetingRoomId', {
      type: Sequelize.STRING,
      onDelete: 'cascade',
      references: {
        model: 'MeetingRooms',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Conferences', 'Conferences_meetingRoomId_fkey');
  },
};
