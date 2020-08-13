import reducerBuilder, { reducerApiAction } from '@doorward/ui/reducers/builder';
import { CREATE_ELECTION, CREATE_NOMINEE, LIST_ELECTIONS, VIEW_ELECTION, VOTE_ELECTION } from './types';
import Api from '../../services/api';

const electionList = reducerApiAction({
  action: LIST_ELECTIONS,
  api: Api.elections.list,
});

const createElection = reducerApiAction({
  action: CREATE_ELECTION,
  api: Api.elections.create,
});

const viewElection = reducerApiAction({
  action: VIEW_ELECTION,
  api: Api.elections.get,
});

const createNominee = reducerApiAction({
  action: CREATE_NOMINEE,
  api: Api.elections.createNominee,
});

const vote = reducerApiAction({
  action: VOTE_ELECTION,
  api: Api.elections.vote,
});

export default reducerBuilder({
  middleware: {
    electionList,
    createElection,
    viewElection,
    createNominee,
    vote,
  },
});
