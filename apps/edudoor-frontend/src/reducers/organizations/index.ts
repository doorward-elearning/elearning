import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import {
  CREATE_ORGANIZATION,
  FETCH_ORGANIZATIONS,
  GET_CURRENT_ORGANIZATION,
  GET_ONE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from './types';
import Api from '../../services/api';

const create = reducerApiAction({
  action: CREATE_ORGANIZATION,
  api: Api.organizations.create,
});

const list = reducerApiAction({
  action: FETCH_ORGANIZATIONS,
  api: Api.organizations.list,
});

const get = reducerApiAction({
  action: GET_ONE_ORGANIZATION,
  api: Api.organizations.get,
});

const update = reducerApiAction({
  action: UPDATE_ORGANIZATION,
  api: Api.organizations.update,
});

const currentOrganization = reducerApiAction({
  action: GET_CURRENT_ORGANIZATION,
  api: Api.organizations.getCurrent,
});

export default reducerBuilder({
  middleware: { create, list, get, update, currentOrganization },
});
