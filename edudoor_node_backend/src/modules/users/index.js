import MRouter from '../../utils/router';
import UserController from './UserController';

const Router = new MRouter();

Router.post('/users/authenticate', UserController.login);

export default Router;
