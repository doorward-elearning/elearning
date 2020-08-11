module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MemberCourses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      memberId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'memberId',
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
    return queryInterface.dropTable('MemberCourses');
  },
};
