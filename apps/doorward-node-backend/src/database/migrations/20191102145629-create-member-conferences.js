module.exports =  {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MemberConferences', {
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
      conferenceId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Conferences',
          key: 'id',
          as: 'conferenceId',
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
    return queryInterface.dropTable('MemberConferences');
  },
};
