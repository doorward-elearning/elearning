import bcrypt from 'bcrypt';
import _ from 'lodash';
import models from '../../database/models';
import JWT from '../../utils/auth';
import { UserInclude } from '../../utils/includes';
import Tools from '../../utils/Tools';
import Emails from '../../utils/Emails';
import * as Roles from '../../utils/roles';
import OrganizationUtils from '../../../../../libs/common/src/utils/OrganizationUtils';

class UserController {
  static async login(req) {
    const { username } = req.body;
    const user = await models.User.findOne({ where: { username }, include: UserInclude });
    if (!user) {
      return [404, undefined, 'The user does not exist'];
    }

    return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
  }

  static async register(req) {
    const organization = OrganizationUtils.get();
    const { user } = await UserController.createUser(req, Roles.STUDENT, organization.id);

    Emails.selfRegistration(user);

    return [200, { token: JWT.generate(user.dataValues), user }, 'Registration successful'];
  }

  static async getCurrentUser(req) {
    const { user } = req;
    const currentUser = await models.User.findOne({ where: { username: user.username }, include: UserInclude });

    return [200, { user: currentUser }];
  }

  static async createUser(req, roleName) {
    const { body } = req;
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, +process.env.BCRYPT_PASSWORD_SALT);
    }
    let user = await models.User.create({
      ...body,
      organizationId: OrganizationUtils.getId(),
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
    if (!body.password) {
      // create the reset link
      await models.PasswordResets.create({
        token: resetToken,
        userId: user.id,
      });
    }

    user = await models.User.findByPk(user.id, {
      include: UserInclude,
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
    const password = bcrypt.hashSync(body.newPassword, +process.env.BCRYPT_PASSWORD_SALT);
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
    const encryptedPassword = bcrypt.hashSync(password, +process.env.BCRYPT_PASSWORD_SALT);
    await user.update({
      password: encryptedPassword,
    });

    await user.passwordResets[0].destroy();

    return [200, undefined, 'Password has been created. You can now login with the new credentials.'];
  }

  static async forgotPassword(req) {
    const {
      body: { email },
    } = req;
    const user = await models.User.findOne({ where: { email } });

    if (user) {
      // create a password reset token for the user
      const resetToken = Tools.randomString(50);

      // create the reset link
      await models.PasswordResets.create({
        token: resetToken,
        userId: user.id,
      });

      Emails.resetPassword(user, resetToken, req.headers.origin);
      return [200, undefined, 'A password reset link has been sent to your email.'];
    }
  }
}

export default UserController;
