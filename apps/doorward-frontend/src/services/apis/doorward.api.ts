import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';
import { buildApiReducer } from 'use-api-action';

const DoorwardApi = buildApiReducer(
  DoorwardBackendApi({ baseURL: process.env.REACT_APP_BASE_URL }),
  'DoorwardBackendApi'
);

export default DoorwardApi;
