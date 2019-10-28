module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      openOlatKey: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
