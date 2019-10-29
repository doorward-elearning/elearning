import * as bcrypt from 'bcrypt';
import models from '../../database/models';
import JWT from '../../utils/auth';
import includes from '../../utils/includes';

class UserController {
  static async login(req) {
    const {
      body: { username, password },
    } = req;
    const user = await models.User.unscoped().findOne({ where: { username }, include: includes.User });

    if (await bcrypt.compare(password, user.password)) {
      delete user.dataValues.password;
      return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
    }
    return [403, undefined, 'Invalid login credentials'];
  }
}

export default UserController;
