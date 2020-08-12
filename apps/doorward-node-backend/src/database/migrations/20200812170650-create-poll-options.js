module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PollOptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      option: {
        type: Sequelize.STRING,
      },
      pollId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'Polls',
          as: 'poll',
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
    return queryInterface.dropTable('PollOptions');
  },
};
