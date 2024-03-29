import DoorwardBackendApi from '@doorward/common/apis/doorward.backend.api';
import Tools from '@doorward/common/utils/Tools';
import buildApiReducer from '@doorward/api-actions/build.api.reducer';

const DoorwardApi = buildApiReducer(
  DoorwardBackendApi(() => {
    return {
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Authorization: 'Bearer ' + (Tools.getToken() || Tools.getOrSetCookie(Tools.IDENTITY_TOKEN, Tools.randomString(50))),
      },
    };
  }),
  'DoorwardBackendApi',
);

export default DoorwardApi;
