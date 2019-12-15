module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MeetingRooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      sessionId: {
        type: Sequelize.TEXT,
      },
      courseId: {
        type: Sequelize.TEXT,
        onDelete: 'cascade',
        references: {
          model: 'Courses',
          key: 'id',
        },
      },
      sessionName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'STARTED',
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
    return queryInterface.dropTable('MeetingRooms');
  },
};
