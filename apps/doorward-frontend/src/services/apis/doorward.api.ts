import buildApiReducer, { ApiReducerMiddleware } from '@doorward/ui/reducers/apiReducer';
import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';
import auth from '../../reducers/auth';
import courses from '../../reducers/courses';

const middleware: ApiReducerMiddleware<ReturnType<typeof DoorwardBackendApi>> = {
  auth,
  courses,
};

const DoorwardApi = buildApiReducer(
  DoorwardBackendApi,
  'DoorwardBackendApi',
  {
    baseURL: process.env.REACT_APP_BASE_URL,
  },
  middleware
);
export default DoorwardApi;
