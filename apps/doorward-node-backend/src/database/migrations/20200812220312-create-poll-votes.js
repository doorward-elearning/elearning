module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PollVotes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      optionId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'PollOptions',
          as: 'option',
        },
      },
      voterId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'Users',
          as: 'voter',
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
    return queryInterface.dropTable('PollVotes');
  },
};
