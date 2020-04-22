'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Classrooms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      schoolId: {
        type: Sequelize.STRING,
        references: {
          model: 'Schools',
          key: 'id',
          as: 'schoolId',
        },
        onDelete: 'cascade',
      },
      meetingRoomId: {
        type: Sequelize.STRING,
        references: {
          model: 'MeetingRooms',
          key: 'id',
          as: 'meetingRoomId',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Classrooms');
  },
};
