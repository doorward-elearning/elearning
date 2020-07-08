module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentCourses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      studentId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'studentId',
        },
        onDelete: 'cascade',
      },
      courseId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id',
          as: 'courseId',
        },
        onDelete: 'cascade',
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'PENDING',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StudentCourses');
  },
};
