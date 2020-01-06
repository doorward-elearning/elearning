export default (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    'Answer',
    {
      answer: DataTypes.JSON,
      description: DataTypes.JSON,
      correct: DataTypes.BOOLEAN,
    },
    {
      paranoid: true,
      defaultScope: {
        attributes: {},
      },
    }
  );
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question, {
      as: 'Question.ts',
      foreignKey: 'questionId',
    });
  };
  return Answer;
};
