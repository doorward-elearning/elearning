import MRouter from '../../utils/router';
import UserController from './UserController';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';

const Router = new MRouter();

Router.post(
  '/users/authenticate',
  BaseValidator.modelExists(
    req => ({
      username: req.body.username,
    }),
    models.User,
    'Invalid login credentials'
  ),
  UserController.login
);

export default Router;
