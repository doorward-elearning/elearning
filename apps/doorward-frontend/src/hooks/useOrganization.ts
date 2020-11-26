import useDoorwardApi from './useDoorwardApi';
import OrganizationModel from '@doorward/common/models/organization.model';
import { useEffect } from 'react';

const useOrganization = (): OrganizationModel | undefined => {
  const organization = useDoorwardApi((state) => state?.organizations?.getCurrentOrganization);

  useEffect(() => {
    const models = organization?.data?.organization?.models;
  }, [organization]);

  return organization?.data?.organization;
};

export default useOrganization;
