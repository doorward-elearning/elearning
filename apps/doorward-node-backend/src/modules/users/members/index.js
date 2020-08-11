import MRouter from '../../../utils/router';
import { validateCreateUser } from '../validate';
import MemberController from './MemberController';
import Authorization from '../../../middleware/Authorization';
import { validateMemberExists } from './validate';

const Router = new MRouter('/', Authorization.authenticate);

Router.post('/', validateCreateUser(), MemberController.createMember);

Router.put('/:memberId', validateMemberExists, req => validateCreateUser(req.body), MemberController.updateMember);

Router.get('/', MemberController.getAllMembers);

Router.post('/:memberId/changePassword', validateMemberExists, MemberController.updateMemberPassword);

Router.get('/:memberId', validateMemberExists, MemberController.getMember);

export default Router;
