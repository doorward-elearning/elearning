import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ReportsController from './ReportsController';
import BaseValidator from '../../middleware/BaseValidator';
import models from '../../database/models';

const Router = new MRouter('/reports', Authorization.authenticate);

Router.get('/students', ReportsController.studentsReport);

Router.get(
  '/students/:studentId',
  BaseValidator.modelExists(req => ({ id: req.params.studentId }), models.User, 'The student does not exist.'),
  ReportsController.studentReport
);

export default Router;
