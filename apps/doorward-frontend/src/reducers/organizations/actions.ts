import { CreateOrganizationBody } from '../../services/models/requestBody';
import {
  CREATE_ORGANIZATION,
  FETCH_ORGANIZATIONS,
  GET_CURRENT_ORGANIZATION,
  GET_ONE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from './types';

export const createOrganization = (body: CreateOrganizationBody) => {
  return {
    type: CREATE_ORGANIZATION,
    payload: [body],
  };
};

export const fetchOrganizations = () => ({
  type: FETCH_ORGANIZATIONS,
});

export const getOrganization = (organizationId: string) => ({
  type: GET_ONE_ORGANIZATION,
  payload: [organizationId],
});

export const updateOrganization = (organizationId: string, body: CreateOrganizationBody) => ({
  type: UPDATE_ORGANIZATION,
  payload: [organizationId, body],
});

export const getCurrentOrganization = () => ({
  type: GET_CURRENT_ORGANIZATION,
});
