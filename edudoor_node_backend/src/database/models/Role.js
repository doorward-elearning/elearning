module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.STRING,
    },
    { paranoid: true, defaultScope: {} }
  );
  Role.associate = function(models) {
    Role.belongsToMany(models.User, {
      foreignKey: 'roleId',
      through: models.UserRole,
      as: 'users',
    });
    Role.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
  };
  return Role;
};
