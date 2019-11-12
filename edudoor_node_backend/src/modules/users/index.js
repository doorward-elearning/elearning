import MRouter from '../../utils/router';
import UserController from './UserController';
import { validateLogin } from './validate';
import students from './students';
import Authorization from '../../middleware/Authorization';

const Router = new MRouter('/users');

Router.post('/auth', validateLogin, UserController.login);

Router.get('/auth', Authorization.authenticate, UserController.getCurrentUser);

Router.use('/students', students);

export default Router;
