export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
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
  UserRole.associate = function(models) {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
  };
  return UserRole;
};
