import bcrypt from 'bcrypt';
import _ from 'lodash';
import shortid from 'shortid';
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
}

export default UserController;
