import useDoorwardApi from './useDoorwardApi';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

const useOrganization = (): OrganizationEntity | undefined => {
  const organization = useDoorwardApi((state) => state?.organizations?.getCurrentOrganization);

  return organization?.data?.organization;
};

export default useOrganization;
