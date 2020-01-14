export default (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'Group',
    {
      name: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  );
  Group.associate = function(models) {
    Group.belongsToMany(models.User, {
      as: 'members',
      through: models.GroupMember,
      foreignKey: 'userId',
    });
  };
  return Group;
};
