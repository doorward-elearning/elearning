export default (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    'GroupMember',
    {
      role: DataTypes.ENUM('ADMINISTRATOR', 'PARTICIPANT'),
    },
    {}
  );
  GroupMember.associate = function(models) {
    GroupMember.belongsTo(models.User, {
      as: 'member',
      foreignKey: 'userId',
    });
    GroupMember.belongsTo(models.Group, {
      as: 'group',
      foreignKey: 'groupId',
    });
  };
  return GroupMember;
};
