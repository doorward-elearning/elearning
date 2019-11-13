module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
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
      gender: DataTypes.STRING,
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
    User.afterFind(user => {
      if (user) {
        let fullName = user.username || '';
        if (user.firstName) {
          fullName = user.firstName;
        }
        if (user.lastName) {
          fullName += ` ${user.lastName}`;
        }
        if (user.dataValues) {
          // eslint-disable-next-line no-param-reassign
          user.dataValues.fullName = fullName.trim();
        }
      }
    });
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
    User.belongsToMany(models.Course, {
      foreignKey: 'studentId',
      as: 'courses',
      through: models.StudentCourse,
    });
    User.hasMany(models.PasswordReset, {
      foreignKey: 'userId',
      as: 'passwordResets',
    });
  };
  return User;
};
