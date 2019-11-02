import bcrypt from 'bcrypt';
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

  static async createUser(req, roleName) {
    const { body } = req;
    const user = await models.User.create({
      ...body,
      password: bcrypt.hashSync(body.password, environment.BCRYPT_PASSWORD_SALT),
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
}

export default UserController;
