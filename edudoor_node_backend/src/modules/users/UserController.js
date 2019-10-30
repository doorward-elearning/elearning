import models from '../../database/models';
import JWT from '../../utils/auth';
import { UserInclude } from '../../utils/includes';

class UserController {
  static async login(req) {
    const { username } = req.body;
    const user = await models.User.findOne({ where: { username }, include: UserInclude });

    return [200, { token: JWT.generate(user.dataValues), user }, 'Login successful'];
  }
}

export default UserController;
