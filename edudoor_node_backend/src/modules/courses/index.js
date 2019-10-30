import MRouter from '../../utils/router';
import UserValidator from '../../middleware/UserValidator';

const Router = new MRouter(UserValidator.authenticate);

Router.post('/courses');

export default Router;
