export default (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'Organization',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      paranoid: true,
    }
  );
  Organization.associate = function(models) {
    Organization.hasMany(models.User, {
      foreignKey: 'organizationId',
      as: 'users',
    });
    Organization.hasMany(models.Role, {
      foreignKey: 'organizationId',
      as: 'roles',
    });
  };
  return Organization;
};
