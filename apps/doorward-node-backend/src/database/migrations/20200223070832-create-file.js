module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      ownerId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'Users',
          as: 'ownerId',
        },
      },
      organizationId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        allowNull: true,
        references: {
          model: 'Organizations',
          as: 'organization.json',
        },
      },
      publicFile: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      publicUrl: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Files');
  },
};
