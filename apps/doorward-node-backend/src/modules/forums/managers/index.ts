import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateForumExists } from '../validate';
import ManagerForumController from './ManagerForumController';
import { validateManagerExists } from './validate';

const Router = new MRouter('/:forumId/managers', Authorization.authenticate, validateForumExists());

Router.get('/', ManagerForumController.getManagers);

Router.post('/register', validateManagerExists(), ManagerForumController.enrollForumManager);

export default Router;
