import buildApiReducer from '@doorward/ui/reducers/apiReducer';
import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';

const apiReducer = buildApiReducer(DoorwardBackendApi, 'DoorwardBackendApi');

const DoorwardApi = apiReducer.actions;

export const DoorwardApiReducers = apiReducer.reducers;

export default DoorwardApi;
