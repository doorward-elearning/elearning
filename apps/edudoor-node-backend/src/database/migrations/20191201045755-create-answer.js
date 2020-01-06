module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.JSON,
      },
      description: {
        type: Sequelize.JSON,
      },
      correct: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      questionId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Questions',
          as: 'questionId',
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
    return queryInterface.dropTable('Answers');
  },
};
