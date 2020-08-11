import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ReportsController from './ReportsController';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';

const Router = new MRouter('/reports', Authorization.authenticate);

Router.get('/members', ReportsController.membersReport);

Router.get('/moderators', ReportsController.moderatorsReport);

Router.get(
  '/members/:memberId',
  BaseValidator.findModelOrThrow('memberId', models.User, 'The member does not exist.'),
  ReportsController.memberReport
);

Router.get(
  '/moderators/:moderatorId',
  BaseValidator.findModelOrThrow('moderatorId', models.User, 'The moderator does not exist.'),
  ReportsController.moderatorReport
);

export default Router;
