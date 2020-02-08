import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import { CREATE_ORGANIZATION, FETCH_ORGANIZATIONS } from './types';
import Api from '../../services/api';

const create = reducerApiAction({
  type: CREATE_ORGANIZATION,
  api: Api.organizations.create,
});

const list = reducerApiAction({
  type: FETCH_ORGANIZATIONS,
  api: Api.organizations.list,
});

export default reducerBuilder({
  middleware: { create, list },
});
