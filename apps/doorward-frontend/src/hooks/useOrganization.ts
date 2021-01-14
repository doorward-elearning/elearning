import OrganizationEntity from '@doorward/common/entities/organization.entity';
import useApiAction from '@doorward/ui/hooks/useApiAction';
import DoorwardApi from '../services/apis/doorward.api';

const useOrganization = (): OrganizationEntity | undefined => {
  const organization = useApiAction(DoorwardApi, (api) => api?.organizations?.getCurrentOrganization).state;

  return organization?.data?.organization;
};

export default useOrganization;
