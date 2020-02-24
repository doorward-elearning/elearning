'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AssignmentSubmissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      studentId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          as: 'studentId',
        },
      },
      assignmentId: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: 'cascade',
        references: {
          model: 'ModuleItems',
          as: 'assignmentId',
        },
      },
      reviewerId: {
        type: Sequelize.STRING,
        onDelete: 'cascade',
        references: {
          model: 'Users',
          as: 'reviewerId',
        },
      },
      submissionType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      submission: {
        type: Sequelize.TEXT,
      },
      reviewedOn: {
        type: Sequelize.DATE,
      },
      points: {
        type: Sequelize.INTEGER,
      },
      resubmission: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('AssignmentSubmissions');
  },
};
