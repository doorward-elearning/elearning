import useBaseAuth from '@doorward/ui/hooks/useAuth';
import useDoorwardApi from './useDoorwardApi';

const useAuth = () => {
  const currentUser = useDoorwardApi((state) => state.auth.getCurrentUser);
  return useBaseAuth(currentUser.data?.user);
};

export default useAuth;
