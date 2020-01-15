const tables = ['MeetingRooms', 'Courses'];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all(
      tables.map(async table => {
        return queryInterface.addColumn(table, 'organizationId', {
          type: Sequelize.STRING,
          onDelete: 'cascade',
          defaultValue: process.env.ORGANIZATION_ID,
          references: {
            model: 'Organizations',
            key: 'id',
          },
        });
      })
    );
    await queryInterface.addColumn('MeetingRooms', 'deletedAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('Meetings', 'deletedAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('GroupMembers', 'deletedAt', {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all(
      tables.map(async table => {
        return queryInterface.removeColumn(table, 'organizationId');
      })
    );
    await queryInterface.removeColumn('MeetingRooms', 'deletedAt');
    await queryInterface.removeColumn('Meetings', 'deletedAt');
    await queryInterface.removeColumn('GroupMembers', 'deletedAt');
  },
};
