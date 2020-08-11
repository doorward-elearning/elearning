import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ReportsController from './ReportsController';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';

const Router = new MRouter('/reports', Authorization.authenticate);

Router.get('/members', ReportsController.membersReport);

Router.get('/teachers', ReportsController.teachersReport);

Router.get(
  '/members/:memberId',
  BaseValidator.findModelOrThrow('memberId', models.User, 'The member does not exist.'),
  ReportsController.memberReport
);

Router.get(
  '/teachers/:teacherId',
  BaseValidator.findModelOrThrow('teacherId', models.User, 'The teacher does not exist.'),
  ReportsController.teacherReport
);

export default Router;
