import MRouter from '../../utils/router';
import Authorization from '../../middleware/Authorization';
import ReportsController from './ReportsController';

const Router = new MRouter('/reports', Authorization.authenticate);

Router.get('/students', ReportsController.studentsReport);

export default Router;
