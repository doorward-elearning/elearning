module.exports =  {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Modules', 'order', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
    queryInterface.addColumn('ModuleItems', 'order', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Modules', 'order');
    queryInterface.removeColumn('ModuleItems', 'order');
  },
};
