import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import Api from '../../services/api';
import { FETCH_SCHOOL, FETCH_SCHOOLS } from './types';

const schoolList = reducerApiAction({
  api: Api.schools.list,
  action: FETCH_SCHOOLS,
});
const school = reducerApiAction({
  api: Api.schools.get,
  action: FETCH_SCHOOL,
});

export default reducerBuilder({ middleware: { schoolList, school } });
