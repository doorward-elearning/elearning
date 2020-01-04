module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ConversationParticipants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      conversationId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Conversations',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      role: {
        type: Sequelize.ENUM('SUBSCRIBER', 'PUBLISHER', 'MODERATOR'),
        defaultValue: 'PUBLISHER',
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
    return queryInterface.dropTable('ConversationParticipants');
  },
};
