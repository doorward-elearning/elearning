module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LiveClassrooms', {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LiveClassrooms');
  },
};
