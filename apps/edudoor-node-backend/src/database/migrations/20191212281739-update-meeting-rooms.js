module.exports =  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MeetingRooms');
    await queryInterface.createTable('MeetingRooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('MeetingRooms');
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
};
