import buildApiReducer, { ApiReducerMiddleware } from '@doorward/ui/reducers/apiReducer';
import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';
import auth from '../../reducers/auth';
import courses from '../../reducers/courses';

const middleware: ApiReducerMiddleware<typeof DoorwardBackendApi> = {
  auth,
  courses,
};

const apiReducer = buildApiReducer(DoorwardBackendApi, 'DoorwardBackendApi', middleware);

const DoorwardApi = apiReducer.actions;

export const DoorwardApiTypes = apiReducer.types;

export const DoorwardApiReducers = apiReducer.reducers;

export default DoorwardApi;
