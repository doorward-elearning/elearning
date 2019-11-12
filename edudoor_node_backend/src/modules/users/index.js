import MRouter from '../../utils/router';
import UserController from './UserController';
import { validateLogin, validatePassword, validateUpdateAccount } from './validate';
import students from './students';
import Authorization from '../../middleware/Authorization';
import BaseValidator from '../../middleware/BaseValidator';

const Router = new MRouter('/users');
const ProfileRouter = new MRouter('/', Authorization.authenticate);

Router.post('/auth', validateLogin, validatePassword, UserController.login);

Router.get('/auth', Authorization.authenticate, UserController.getCurrentUser);

Router.use('/students', students);
Router.use('/profile', ProfileRouter);

ProfileRouter.put(
  '/account',
  BaseValidator.fields('username', 'email', 'firstName', 'lastName'),
  validateUpdateAccount,
  UserController.updateAccountDetails
);

ProfileRouter.put(
  '/password',
  BaseValidator.fields('password', 'newPassword'),
  validatePassword,
  UserController.updateUserPassword
);

export default Router;
