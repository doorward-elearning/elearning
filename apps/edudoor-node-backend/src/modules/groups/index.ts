import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import GroupsController from './GroupsController';
import { validateAddUserToGroup, validateCreateGroup, validateGroupExists } from './validate';

const Router = new MRouter('/groups', Authorization.authenticate);

Router.post('', validateCreateGroup, validateAddUserToGroup, GroupsController.createGroup);

Router.post('/:groupId', validateGroupExists, validateAddUserToGroup, GroupsController.addUserToGroup);

Router.get('/:groupId', validateGroupExists, GroupsController.getGroup);

Router.get('', GroupsController.getGroups);

export default Router;
