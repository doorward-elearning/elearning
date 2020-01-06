import JWT from '../utils/auth';
import models from '../database/models';

export default class Authorization {
  static async authenticate(req) {
    const auth = req.headers.authorization;

    const token = auth ? auth.split(' ') : [];

    if (token.length !== 2 || token[0].toLowerCase() !== 'bearer') {
      return [401, undefined, 'Authorization token not provided'];
    }

    try {
      const authToken = token[1];
      const decoded = await JWT.verify(authToken);
      req.userToken = authToken;

      req.user = await models.User.findByPk(decoded.id, {
        include: [
          {
            model: models.Role,
            as: 'roles',
          },
        ],
      });
      if (!req.user) {
        return [404, undefined, 'User not found'];
      }
    } catch (error) {
      return [401, undefined, 'Invalid authorization token'];
    }
  }

  static checkRoles(roles, message) {
    const response = [401, undefined, message || 'You are not authorized to perform this action'];
    return async req => {
      const {
        user: { roles: userRoles = [] },
      } = req;
      if (roles) {
        if (roles.constructor === String) {
          if (!userRoles.find(role => role.name === roles)) {
            return response;
          }
        } else if (roles.constructor === Array) {
          if (!userRoles.find(role => role.name.includes(role))) {
            return response;
          }
        }
      }
    };
  }
}
