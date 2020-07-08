module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MeetingRooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      meetingRoomName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MeetingRoomMembers');
    await queryInterface.dropTable('MeetingRooms');
  },
};
