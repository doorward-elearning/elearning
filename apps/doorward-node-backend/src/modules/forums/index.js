import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import modules from './modules';
import members from './members';
import managers from './managers';
import { validateForumExists, validateCreateForum, validateUpdateForum } from './validate';
import ForumController from './ForumController';

const Router = new MRouter('/forums', Authorization.authenticate);

Router.post('', validateCreateForum, ForumController.createForum);

Router.get('', ForumController.getForums);

Router.put('/:forumId', validateUpdateForum, ForumController.updateForum);

Router.get('/:forumId', validateForumExists(), ForumController.getForum);

Router.delete('/:forumId', validateForumExists(), ForumController.deleteForum);

Router.put('/:forumId/modules', ForumController.updateForumModules);

Router.post('/:forumId/room', validateForumExists(), ForumController.startMeeting);

Router.post('/:forumId/room/join', validateForumExists(), ForumController.joinMeeting);

Router.use('/', modules);

Router.use('/', members);

Router.use('/', managers);

export default Router;
