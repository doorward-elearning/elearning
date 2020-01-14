import reducerBuilder, { reducerApiAction } from '@edudoor/ui/reducers/builder';
import Api from '../../services/api';
import { FETCH_GROUPS } from './types';

const groupList = reducerApiAction({
  api: Api.groups.list,
  action: FETCH_GROUPS,
});

export default reducerBuilder({
  middleware: { groupList },
});
