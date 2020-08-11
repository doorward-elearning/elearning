import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import { validateConferenceExists } from '../validate';
import ManagerConferenceController from './ManagerConferenceController';
import { validateManagerExists } from './validate';

const Router = new MRouter('/:conferenceId/managers', Authorization.authenticate, validateConferenceExists());

Router.get('/', ManagerConferenceController.getManagers);

Router.post('/register', validateManagerExists(), ManagerConferenceController.enrollConferenceManager);

export default Router;
