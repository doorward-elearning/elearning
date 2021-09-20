import OrganizationEntity from '@doorward/common/entities/organization.entity';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../services/apis/doorward.api';

const useOrganization = (): OrganizationEntity | undefined => {
  const [, organization] = useApiAction(DoorwardApi, (api) => api?.organizations?.getCurrentOrganization);

  return organization?.data?.organization;
};

export default useOrganization;
