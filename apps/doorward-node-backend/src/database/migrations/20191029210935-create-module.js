module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Modules', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
      },
      conferenceId: {
        type: Sequelize.STRING,
        references: {
          model: 'Conferences',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Modules');
  },
};
