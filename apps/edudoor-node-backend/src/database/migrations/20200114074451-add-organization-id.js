module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = ['MeetingRooms', 'Course'];

    await Promise.all(
      tables.map(async table => {
        return queryInterface.addColumn(table, 'organizationId', {
          type: Sequelize.STRING,
          onDelete: 'cascade',
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

  down: (queryInterface, Sequelize) => {},
};
