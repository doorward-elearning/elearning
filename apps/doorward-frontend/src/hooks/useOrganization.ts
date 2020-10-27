import useDoorwardApi from './useDoorwardApi';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { useEffect } from 'react';

const useOrganization = (): OrganizationEntity | undefined => {
  const organization = useDoorwardApi((state) => state?.organizations?.getCurrentOrganization);

  useEffect(() => {
    const models = organization?.data?.organization?.models;
  }, [organization]);

  return organization?.data?.organization;
};

export default useOrganization;
