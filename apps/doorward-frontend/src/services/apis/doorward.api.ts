import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';
import { buildApiReducer } from 'use-api-action';
import Tools from '@doorward/common/utils/Tools';

const DoorwardApi = buildApiReducer(
  DoorwardBackendApi(() => {
    return {
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Authorization: 'Bearer ' + Tools.getToken(),
      },
    };
  }),
  'DoorwardBackendApi'
);

export default DoorwardApi;
