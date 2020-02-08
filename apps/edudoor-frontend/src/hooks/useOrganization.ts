import { useSelector } from 'react-redux';
import { State } from '../store';

const useOrganization = () => {
  const state = useSelector((state: State) => state.organizations.currentOrganization);

  return state.data.organization;
};

export default useOrganization;
