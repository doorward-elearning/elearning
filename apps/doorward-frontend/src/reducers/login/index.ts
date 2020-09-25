import { modifyReducer } from '@doorward/ui/reducers/builder';
import Tools from '@doorward/common/utils/Tools';
import { Action } from '@doorward/ui/reducers/reducers';
import ApiRequest from '@doorward/ui/services/apiRequest';

export default  {
  apiMiddleware: {
    error: (): void => {
      Tools.isLoggedIn();
    },
    after: (request: any, response: any): void => {
      Tools.setToken(response.token);
      ApiRequest.setAuth();
    }
  },
  reducer: (state: any, action: Action) => {
    if (action.type === 'CLEAR_LOGIN') {
      return modifyReducer('data', state, action, () => {});
    } else {
      return state;
    }
  }
};
