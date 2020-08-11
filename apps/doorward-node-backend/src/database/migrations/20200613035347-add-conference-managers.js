module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ConferenceManagers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      managerId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
          as: 'managerId',
        },
        onDelete: 'cascade',
      },
      conferenceId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Conferences',
          key: 'id',
          as: 'conferenceId',
        },
      },
      enrolledById: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
          as: 'enrolledById',
        },
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
    return queryInterface.dropTable('ConferenceManagers');
  },
};
