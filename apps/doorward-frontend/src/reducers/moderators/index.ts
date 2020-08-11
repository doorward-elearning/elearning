import { CREATE_MODERATOR, FETCH_ALL_MODERATORS } from './types';
import Api from '../../services/api';
import reducerBuilder, { reducerApiAction } from '@doorward/ui/reducers/builder';

const moderatorList = reducerApiAction({
  action: FETCH_ALL_MODERATORS,
  api: Api.users.moderators.list
});

const createModerator = reducerApiAction({
  action: CREATE_MODERATOR,
  api: Api.users.moderators.create
});

export default reducerBuilder({
  middleware: {
    moderatorList,
    createModerator
  }
});
