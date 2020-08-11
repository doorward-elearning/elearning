import MRouter from '../../../utils/router';
import Authorization from '../../../middleware/Authorization';
import MemberCourseController from './MemberCourseController';
import { validateCreateUser } from '../../users/validate';
import { validateCourseExists } from '../validate';

const Router = new MRouter('/:courseId/members', Authorization.authenticate, validateCourseExists());

Router.get('/', MemberCourseController.getMembers);

Router.post('/', validateCreateUser(), MemberCourseController.createMember);

Router.get('/not-registered', MemberCourseController.getMembersNotRegistered);

Router.post('/register', MemberCourseController.addMember);

Router.delete('/:memberId', MemberCourseController.unEnrollMember);

export default Router;
