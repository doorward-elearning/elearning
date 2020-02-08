import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import { CREATE_ORGANIZATION, FETCH_ORGANIZATIONS } from './types';
import Api from '../../services/api';

const create = reducerApiAction({
  action: CREATE_ORGANIZATION,
  api: Api.organizations.create,
});

const list = reducerApiAction({
  action: FETCH_ORGANIZATIONS,
  api: Api.organizations.list,
});

export default reducerBuilder({
  middleware: { create, list },
});
