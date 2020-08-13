import { CREATE_ELECTION, CREATE_NOMINEE, LIST_ELECTIONS, VIEW_ELECTION } from './types';
import { CreateElectionBody, CreateNomineeBody } from '../../services/models/requestBody';

export const createElectionAction = (body: CreateElectionBody) => ({
  type: CREATE_ELECTION,
  payload: [body],
});

export const listElectionsAction = () => ({
  type: LIST_ELECTIONS,
  payload: [],
});

export const fetchElectionAction = (electionId: string) => ({
  type: VIEW_ELECTION,
  payload: [electionId],
});

export const addNomineeAction = (electionId: string, body: CreateNomineeBody) => ({
  type: CREATE_NOMINEE,
  payload: [electionId, body],
});
