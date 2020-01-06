module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define(
    'PasswordReset',
    {
      token: DataTypes.STRING,
    },
    { paranoid: true }
  );
  PasswordReset.associate = function(models) {
    PasswordReset.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return PasswordReset;
};
