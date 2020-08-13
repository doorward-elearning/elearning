import reducerBuilder, { reducerApiAction } from '@doorward/ui/reducers/builder';
import { CREATE_ELECTION, LIST_ELECTIONS } from './types';
import Api from '../../services/api';

const electionList = reducerApiAction({
  action: LIST_ELECTIONS,
  api: Api.elections.list,
});

const createElection = reducerApiAction({
  action: CREATE_ELECTION,
  api: Api.elections.create,
});

export default reducerBuilder({
  middleware: {
    electionList,
    createElection,
  },
});
