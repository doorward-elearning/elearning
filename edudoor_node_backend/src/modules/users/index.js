import MRouter from '../../utils/router';
import UserController from './UserController';
import { validateLogin } from './validate';

const Router = new MRouter('/users');

Router.post('/authenticate', validateLogin, UserController.login);

export default Router;
