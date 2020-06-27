import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import Api from '../../services/api';
import { CREATE_GROUP, FETCH_GROUP, FETCH_GROUPS, UPDATE_GROUP } from './types';

const groupList = reducerApiAction({
  api: Api.groups.list,
  action: FETCH_GROUPS,
});

const createGroup = reducerApiAction({
  api: Api.groups.create,
  action: CREATE_GROUP,
});

const updateGroup = reducerApiAction({
  api: Api.groups.update,
  action: UPDATE_GROUP,
});

const viewGroup = reducerApiAction({
  api: Api.groups.get,
  action: FETCH_GROUP,
});

export default reducerBuilder({
  middleware: { groupList, createGroup, viewGroup, updateGroup },
});
