module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ElectionNominees', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      profile: {
        type: Sequelize.TEXT,
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      electionId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'Elections',
          as: 'election',
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
    return queryInterface.dropTable('ElectionNominees');
  },
};
