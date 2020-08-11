module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Forums', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      objectives: {
        type: Sequelize.TEXT,
      },
      requirements: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM('REVIEW', 'PUBLISHED', 'FINISHED'),
        defaultValue: 'REVIEW',
      },
      createdBy: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
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
    return queryInterface.dropTable('Forums');
  },
};
