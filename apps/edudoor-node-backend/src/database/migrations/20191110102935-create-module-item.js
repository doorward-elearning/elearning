module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ModuleItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Page',
      },
      moduleId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Modules',
          as: 'moduleId',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          as: 'userId',
          key: 'id',
        },
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
    return queryInterface.dropTable('ModuleItems');
  },
};
