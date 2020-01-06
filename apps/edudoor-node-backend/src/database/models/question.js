module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      question: DataTypes.JSON,
      points: DataTypes.INTEGER
    },
    {
      paranoid: true,
    }
  );
  Question.associate = function(models) {
    Question.belongsTo(models.ModuleItem, {
      as: 'quiz',
      foreignKey: 'quizId',
    });
    Question.hasMany(models.Answer, {
      as: 'answers',
      foreignKey: 'questionId',
    });
  };
  return Question;
};
