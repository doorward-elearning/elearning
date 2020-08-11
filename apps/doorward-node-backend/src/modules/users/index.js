import MRouter from '../../utils/router';
import UserController from './UserController';
import {
  validateUserExistsByEmail,
  validateLogin,
  validatePassword,
  validateResetToken,
  validateUpdateAccount,
  validateRegistration, validateUserExistsByUsername,
} from './validate';
import members from './members';
import teachers from './teachers';
import Authorization from '../../middleware/Authorization';
import BaseValidator from '../../middleware/BaseValidator';

const Router = new MRouter('/users');
const ProfileRouter = new MRouter('/', Authorization.authenticate);

Router.post('/auth', validateLogin, validatePassword, UserController.login);

Router.post('/register', validateRegistration, UserController.register);

Router.get('/auth', Authorization.authenticate, UserController.getCurrentUser);

Router.use('/members', members);
Router.use('/profile', ProfileRouter);
Router.use('/teachers', teachers);

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

ProfileRouter.exclude(Authorization.authenticate).post(
  '/resetPassword',
  BaseValidator.fields('resetToken', 'resetTokenBuffer', 'password'),
  validateResetToken,
  UserController.resetUserPassword
);

ProfileRouter.exclude(Authorization.authenticate).post(
  '/forgotPassword',
  validateUserExistsByUsername,
  UserController.forgotPassword
);

export default Router;
