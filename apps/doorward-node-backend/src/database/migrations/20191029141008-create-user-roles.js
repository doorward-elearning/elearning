module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
        onDelete: 'CASCADE',
      },
      roleId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleId',
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
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserRoles');
  },
};
