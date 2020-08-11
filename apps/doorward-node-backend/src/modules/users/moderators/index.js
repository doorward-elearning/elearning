import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateCreateUser } from '../validate';
import ModeratorController from './ModeratorController';

const Router = new MRouter('/', Authorization.authenticate);

Router.post('/', validateCreateUser(), ModeratorController.createModerator);

Router.exclude(Authorization.authenticate).post('/free-trial', validateCreateUser(), ModeratorController.createModerator);

Router.get('/', ModeratorController.getAllModerators);

export default Router;
