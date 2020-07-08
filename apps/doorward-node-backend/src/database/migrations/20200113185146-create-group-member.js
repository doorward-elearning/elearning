module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupMembers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      groupId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Groups',
          key: 'id',
        },
      },
      addedBy: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      role: {
        type: Sequelize.ENUM('ADMINISTRATOR', 'PARTICIPANT'),
        defaultValue: 'PARTICIPANT',
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
    return queryInterface.dropTable('GroupMembers');
  },
};
