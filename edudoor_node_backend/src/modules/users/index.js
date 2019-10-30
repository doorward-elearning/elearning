import MRouter from '../../utils/router';
import UserController from './UserController';
import { validateLogin } from './validate';

const Router = new MRouter();

Router.post('/users/authenticate', validateLogin, UserController.login);

export default Router;
