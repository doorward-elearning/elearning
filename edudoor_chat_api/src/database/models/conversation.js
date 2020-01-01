module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Conversation.associate = function(models) {
    // associations can be defined here
  };
  return Conversation;
};
