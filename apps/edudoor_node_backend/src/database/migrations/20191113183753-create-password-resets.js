const shortid = require('shortid');
const randomString = require('random-string');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PasswordResets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          as: 'userId',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // generate tokens for users with no password
    const users = await queryInterface.sequelize.query('SELECT id FROM "Users" WHERE password IS NULL');
    await Promise.all(
      users[0].map(user => {
        return queryInterface.sequelize.query(
          `INSERT INTO "PasswordResets" ("id", "token", "userId", "createdAt", "updatedAt") 
            VALUES (:id, :token, :userId, :createdAt, :updatedAt)`,
          {
            replacements: {
              id: shortid.generate(),
              token: randomString({
                length: 50,
              }),
              userId: user.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          }
        );
      })
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PasswordResets');
  },
};
