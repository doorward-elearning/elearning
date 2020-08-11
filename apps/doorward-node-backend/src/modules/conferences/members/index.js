import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import MemberConferenceController from './MemberConferenceController';
import { validateCreateUser } from '../../users/validate';
import { validateConferenceExists } from '../validate';

const Router = new MRouter('/:conferenceId/members', Authorization.authenticate, validateConferenceExists());

Router.get('/', MemberConferenceController.getMembers);

Router.post('/', validateCreateUser(), MemberConferenceController.createMember);

Router.get('/not-registered', MemberConferenceController.getMembersNotRegistered);

Router.post('/register', MemberConferenceController.addMember);

Router.delete('/:memberId', MemberConferenceController.unEnrollMember);

export default Router;
