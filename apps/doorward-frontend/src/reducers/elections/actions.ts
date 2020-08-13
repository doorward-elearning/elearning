import { CREATE_ELECTION, LIST_ELECTIONS } from './types';
import { CreateElectionBody } from '../../services/models/requestBody';

export const createElectionAction = (body: CreateElectionBody) => ({
  type: CREATE_ELECTION,
  payload: [body],
});

export const listElectionsAction = () => ({
  type: LIST_ELECTIONS,
  payload: [],
});
