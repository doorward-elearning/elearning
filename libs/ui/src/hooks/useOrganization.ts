import { useSelector } from 'react-redux';

const useOrganization = () => {
  const organization = useSelector((state: any) => state?.organizations?.currentOrganization);

  return organization?.data?.organization;
};

export default useOrganization;
