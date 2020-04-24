import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import Api from '../../services/api';
import { CREATE_CLASSROOM, FETCH_SCHOOL, FETCH_SCHOOLS } from './types';

const schoolList = reducerApiAction({
  api: Api.schools.list,
  action: FETCH_SCHOOLS,
});
const school = reducerApiAction({
  api: Api.schools.get,
  action: FETCH_SCHOOL,
});

const newClassroom = reducerApiAction({
  api: Api.schools.classrooms.create,
  action: CREATE_CLASSROOM,
});

export default reducerBuilder({ middleware: { schoolList, school, newClassroom } });
