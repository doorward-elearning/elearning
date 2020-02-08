import { CreateOrganizationBody } from '../../services/models/requestBody';
import { CREATE_ORGANIZATION, FETCH_ORGANIZATIONS } from './types';

export const createOrganization = (body: CreateOrganizationBody) => {
  return {
    type: CREATE_ORGANIZATION,
    payload: [body],
  };
};

export const fetchOrganizations = () => ({
  type: FETCH_ORGANIZATIONS,
});
