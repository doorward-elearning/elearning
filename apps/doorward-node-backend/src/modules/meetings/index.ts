import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import MeetingsController from './MeetingsController';

const Router = new MRouter('/meetings');

Router.get('/:id', Authorization.authenticatePublic, MeetingsController.joinMeeting);

Router.exclude(Authorization.authenticate).post('/webhook', MeetingsController.processWebhook);

export default Router;
