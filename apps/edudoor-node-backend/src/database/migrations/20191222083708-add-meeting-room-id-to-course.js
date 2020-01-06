module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Courses', 'meetingRoomId', {
      type: Sequelize.STRING,
      onDelete: 'cascade',
      references: {
        model: 'MeetingRooms',
        key: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Courses', 'Courses_meetingRoomId_fkey');
  },
};
