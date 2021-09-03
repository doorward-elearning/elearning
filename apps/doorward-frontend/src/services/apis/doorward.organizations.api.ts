import Tools from '@doorward/common/utils/Tools';
import buildApiReducer from '@doorward/api-actions/build.api.reducer';

const DoorwardApi = buildApiReducer(
  DoorwardOrganizationsApi(() => {
    return {
      baseURL: process.env.REACT_APP_ORGANIZATIONS_API_BASE_URL,
      headers: {
        Authorization: 'Bearer ' + Tools.getToken(),
      },
    };
  }),
  'DoorwardOrganizationsApi'
);

export default DoorwardApi;
