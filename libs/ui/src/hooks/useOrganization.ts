import { useSelector } from 'react-redux';
import { Organization } from '@doorward/common/models/Organization';

const useOrganization = (): Organization | undefined => {
  const organization = useSelector((state: any) => state?.organizations?.currentOrganization);

  return organization?.data?.organization;
};

export default useOrganization;
