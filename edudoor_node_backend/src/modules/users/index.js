import MRouter from '../../utils/router';
import UserController from './UserController';
import { validateLogin } from './validate';
import students from './students';

const Router = new MRouter('/users');

Router.post('/authenticate', validateLogin, UserController.login);

Router.use('/students', students);

export default Router;
