module.exports = (sequelize, DataTypes) => {
  const ConversationParticipant = sequelize.define(
    'ConversationParticipant',
    {
      name: DataTypes.STRING,
    },
    {}
  );
  ConversationParticipant.associate = function(models) {
    // associations can be defined here
  };
  return ConversationParticipant;
};
