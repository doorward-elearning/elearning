import bcrypt from 'bcrypt';
import _ from 'lodash';
import models from '../../database/models';
import JWT from '../../utils/auth';
import { UserInclude } from '../../utils/includes';
import * as environment from '../../config/environment';
import Tools from '../../utils/Tools';

class UserController {
  static async login(req) {
    const { username } = req.body;
    const user = await models.User.findOne({ where: { username }, include: UserInclude });

    return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
  }

  static async getCurrentUser(req) {
    const { user } = req;
    const currentUser = await models.User.findOne({ where: { username: user.username }, include: UserInclude });

    return [200, { user: currentUser }];
  }

  static async createUser(req, roleName, organizationId) {
    const { body } = req;
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, environment.BCRYPT_PASSWORD_SALT);
    }
    const user = await models.User.create({
      ...body,
      organizationId,
    });

    const role = await models.Role.findOne({
      where: {
        name: roleName,
      },
    });

    // create the role for the user
    await models.UserRole.create({
      userId: user.id,
      roleId: role.id,
    });

    delete user.dataValues.password;

    const resetToken = Tools.randomString(50);

    // create the reset link
    await models.PasswordReset.create({
      token: resetToken,
      userId: user.id,
    });

    return {
      user,
      resetToken,
    };
  }

  static async findOneByRole(role, options = {}) {
    return UserController.findByRole(role, options, 'findOne');
  }

  static async findByRole(role, options = {}, method = 'findAll') {
    const include = _.unionBy(
      options.include || [],
      [
        {
          model: models.Role,
          as: 'roles',
          where: {
            name: role,
          },
          through: {
            attributes: [],
          },
        },
      ],
      'model'
    );
    return models.User[method]({
      ...options,
      where: options.where || {},
      include,
    });
  }

  static async updateAccountDetails({ body, user: { id } }) {
    const user = await models.User.findByPk(id, {
      include: UserInclude,
    });

    await user.update({
      ...body,
    });
    await user.reload();

    return [200, { user }, 'Profile account details updated.'];
  }

  static async updateUserPassword(req) {
    const { body } = req;
    const password = bcrypt.hashSync(body.newPassword, environment.BCRYPT_PASSWORD_SALT);
    await req.user.update({
      password,
    });

    return [200, undefined, 'Password has been updated.'];
  }

  static async resetUserPassword(req) {
    const {
      body: { password },
      user,
    } = req;
    // create the password for the user.
    const encryptedPassword = bcrypt.hashSync(password, environment.BCRYPT_PASSWORD_SALT);
    await user.update({
      password: encryptedPassword,
    });

    await user.passwordResets[0].destroy();

    return [200, undefined, 'Password has been created. You can now login with the new credentials.'];
  }
}

export default UserController;
