module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      zipCode: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      status: DataTypes.STRING,
    },
    {
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    }
  );
  User.associate = function(models) {
    User.belongsToMany(models.Role, {
      foreignKey: 'userId',
      as: 'roles',
      through: models.UserRole,
    });
    User.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
    User.hasMany(models.Course, {
      foreignKey: 'createdBy',
      as: 'authoredCourses',
    });
  };
  return User;
};
