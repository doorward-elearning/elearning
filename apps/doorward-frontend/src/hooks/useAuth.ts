import useBaseAuth from '@doorward/ui/hooks/useAuth';
import useApiAction from '@doorward/ui/hooks/useApiAction';
import DoorwardApi from '../services/apis/doorward.api';

const useAuth = () => {
  const currentUser = useApiAction(DoorwardApi, (state) => state.auth.getCurrentUser).state;
  return useBaseAuth(currentUser.data?.user);
};

export default useAuth;
