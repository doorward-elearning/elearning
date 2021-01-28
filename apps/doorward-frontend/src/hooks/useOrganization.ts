import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { useApiAction } from 'use-api-action';
import DoorwardApi from '../services/apis/doorward.api';

const useOrganization = (): OrganizationEntity | undefined => {
  const [, organization] = useApiAction(DoorwardApi, (api) => api?.organizations?.getCurrentOrganization);

  return organization?.data?.organization;
};

export default useOrganization;
