import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import MemberForumController from './MemberForumController';
import { validateCreateUser } from '../../users/validate';
import { validateForumExists } from '../validate';

const Router = new MRouter('/:forumId/members', Authorization.authenticate, validateForumExists());

Router.get('/', MemberForumController.getMembers);

Router.post('/', validateCreateUser(), MemberForumController.createMember);

Router.get('/not-registered', MemberForumController.getMembersNotRegistered);

Router.post('/register', MemberForumController.addMember);

Router.delete('/:memberId', MemberForumController.unEnrollMember);

export default Router;
