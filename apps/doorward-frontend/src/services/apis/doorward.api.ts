import buildApiReducer from '@doorward/ui/reducers/apiReducer';
import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';
import login from '../../reducers/login';

const middleware = {
  auth: {
    login,
  },
};

const apiReducer = buildApiReducer(DoorwardBackendApi, 'DoorwardBackendApi', middleware);

const DoorwardApi = apiReducer.actions;

export const DoorwardApiReducers = apiReducer.reducers;

export default DoorwardApi;
