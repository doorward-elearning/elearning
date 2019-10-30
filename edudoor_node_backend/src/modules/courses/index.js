import MRouter from '../../utils/router';
import Authorization from '../../middleware/UserValidator';

const Router = new MRouter(Authorization.authenticate);

Router.post('/courses');

export default Router;
