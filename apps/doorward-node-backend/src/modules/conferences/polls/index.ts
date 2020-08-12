import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import PollsController from './PollsController';

const Router = new MRouter('/:conferenceId/polls/', Authorization.authenticate);

Router.get('/', PollsController.getPolls);

Router.post('/', PollsController.createPoll);

export default Router;
