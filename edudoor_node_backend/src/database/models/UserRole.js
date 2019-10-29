module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    'UserRoles',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
  UserRoles.associate = function(models) {
    UserRoles.hasOne(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserRoles.hasOne(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
  };
  return UserRoles;
};
