import OrganizationEntity from '@doorward/common/entities/organization.entity';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardOrganizationsApi from '../services/apis/doorward.organizations.api';

const useOrganization = (): OrganizationEntity | undefined => {
  const [, organization] = useApiAction(DoorwardOrganizationsApi, (api) => api?.organizations?.getCurrentOrganization);

  return organization?.data?.organization;
};

export default useOrganization;
