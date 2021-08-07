import useBaseAuth from '@doorward/ui/hooks/useAuth';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../services/apis/doorward.api';

const useAuth = () => {
  const [, currentUser] = useApiAction(DoorwardApi, (state) => state.auth.getCurrentUser);
  return useBaseAuth(currentUser.data?.user);
};

export default useAuth;
