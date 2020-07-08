import MRouter from '../../utils/router';
import { validateCreateClassroom, validateCreateSchool } from './validate';
import SchoolsController from './SchoolsController';

const Router = new MRouter('/schools');

Router.post('/', validateCreateSchool, SchoolsController.createSchool);

Router.get('/', SchoolsController.fetchSchools);

Router.get('/:schoolId', SchoolsController.fetchSchool);

Router.post('/:schoolId/classrooms', validateCreateClassroom, SchoolsController.createClassroom);

export default Router;
