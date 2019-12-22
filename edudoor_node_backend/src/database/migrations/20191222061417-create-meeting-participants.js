module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MeetingParticipants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      meetingRoomId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'MeetingRooms',
          key: 'id',
        },
      },
      participantId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      role: {
        type: Sequelize.ENUM('SUBSCRIBER', 'PUBLISHER', 'MODERATOR'),
        defaultValue: 'PUBLISHER',
      },
      joinedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      leftAt: {
        type: Sequelize.DATE,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MeetingParticipants');
  },
};
