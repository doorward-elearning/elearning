import bcrypt from 'bcrypt';
import _ from 'lodash';
import models from '../../database/models';
import JWT from '../../utils/auth';
import { UserInclude } from '../../utils/includes';
import Tools from '../../utils/Tools';
import Emails from '../../utils/Emails';
import * as Roles from '../../utils/roles';
import OrganizationUtils from '../../utils/OrganizationUtils';
import { PaginateResult } from 'sequelize-paginate';
import { PaginationMetaData } from '@doorward/backend/interceptors/transform.interceptor';

class UserController {
  static async login(req) {
    const { username } = req.body;
    const user: any = await models.User.findOne({ where: { username }, include: UserInclude });
    if (!user) {
      return [404, undefined, 'The user does not exist'];
    }

    return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
  }

  static async register(req) {
    const { user } = await UserController.createUser(req, Roles.STUDENT);

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
    const originalPassword = body.password;
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, +process.env.BCRYPT_PASSWORD_SALT);
    }
    let user: any = await models.User.create({
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
      originalPassword,
    };
  }

  static async paginate<T = any>(req, role, options = {}): Promise<{ model: Array<T> } & PaginationMetaData> {
    const paginationOptions = {
      page: req.query.page || 1,
      paginate: req.query.limit || +process.env.ITEMS_PER_PAGE,
      unique: true,
      ...options,
    };
    const { docs, pages, total } = await UserController.findByRole<PaginateResult<T>>(
      role,
      paginationOptions,
      'paginate'
    );
    console.log(paginationOptions);

    return {
      model: docs,
      pagination: { pages, total, page: paginationOptions.page },
    };
  }

  static async findOneByRole(role, options = {}) {
    return UserController.findByRole(role, options, 'findOne');
  }

  static async findByRole<T = any>(role, options: any = {}, method = 'findAll'): Promise<T> {
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
    console.log(options.where);

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
      body: { username },
    } = req;
    const user = await models.User.findOne({ where: { username } });

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
