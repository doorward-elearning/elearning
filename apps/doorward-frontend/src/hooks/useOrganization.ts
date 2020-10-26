import useDoorwardApi from './useDoorwardApi';
import OrganizationEntity from '@doorward/common/entities/organization.entity';
import { useEffect } from 'react';
import i18next from 'i18next';

const useOrganization = (): OrganizationEntity | undefined => {
  const organization = useDoorwardApi((state) => state?.organizations?.getCurrentOrganization);

  useEffect(() => {
    const models = organization?.data?.organization?.models;
    if(models) {
      i18next.emit()
    }
  }, [organization])

  return organization?.data?.organization;
};

export default useOrganization;
