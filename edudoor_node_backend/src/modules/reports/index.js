import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ReportsController from './ReportsController';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';

const Router = new MRouter('/reports', Authorization.authenticate);

Router.get('/students', ReportsController.studentsReport);

Router.get('/teachers', ReportsController.teachersReport);

Router.get(
  '/students/:studentId',
  BaseValidator.findModelOrThrow('studentId', models.User, 'The student does not exist.'),
  ReportsController.studentReport
);

Router.get(
  '/teachers/:teacherId',
  BaseValidator.findModelOrThrow('teacherId', models.User, 'The teacher does not exist.'),
  ReportsController.teacherReport
);

export default Router;
