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
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          const model = this;
          let fullName = model.username;
          if (model.firstName) {
            fullName = model.firstName;
          }
          if (model.lastName) {
            fullName += ` ${model.lastName}`;
          }

          return fullName;
        },
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
          include: ['fullName'],
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
