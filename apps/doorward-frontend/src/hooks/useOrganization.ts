import useDoorwardApi from './useDoorwardApi';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { updateTranslationOrganization } from '../lang/t';

const useOrganization = (): OrganizationEntity | undefined => {
  const organization = useDoorwardApi((state) => state?.organizations?.getCurrentOrganization);
  if (organization?.data?.organization) {
    updateTranslationOrganization(organization?.data?.organization);
  }

  return organization?.data?.organization;
};

export default useOrganization;
