import { CREATE_MODERATOR, FETCH_ALL_MODERATORS } from './types';
import { CreateModeratorBody } from '../../services/models/requestBody';

export const fetchModeratorListAction = (query = '') => ({
  type: FETCH_ALL_MODERATORS,
  payload: [query],
});

export const createModeratorAction = (body: CreateModeratorBody) => ({
  type: CREATE_MODERATOR,
  payload: [body],
});
