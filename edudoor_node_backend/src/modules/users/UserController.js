import bcrypt from 'bcrypt';
import _ from 'lodash';
import models from '../../database/models';
import JWT from '../../utils/auth';
import { UserInclude } from '../../utils/includes';
import * as environment from '../../config/environment';

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
    return user;
  }

  static async findByRole(role, options = {}) {
    const include = _.unionBy(
      options.include || [],
      [
        {
          model: models.Role,
          as: 'roles',
          where: {
            name: role,
          },
        },
      ],
      'model'
    );
    return models.User.findAll({
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

  static async createUserPassword(req) {
    const {
      body: { username, password },
    } = req;
    const user = await models.User.findOne({ where: { username } });

    // create the password for the user.
    const encryptedPassword = bcrypt.hashSync(password, environment.BCRYPT_PASSWORD_SALT);
    await user.update({
      password: encryptedPassword,
    });

    return [201, undefined, 'Password has been created. Login to continue.'];
  }
}

export default UserController;
