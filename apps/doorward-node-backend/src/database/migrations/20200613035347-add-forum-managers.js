module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ForumManagers', {
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
      forumId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Forums',
          key: 'id',
          as: 'forumId',
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
    return queryInterface.dropTable('ForumManagers');
  },
};
