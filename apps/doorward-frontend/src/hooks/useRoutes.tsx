import { useContext } from 'react';
import { AppContext } from '../main';
import useBaseRoutes, { UseBaseRoutes } from '@doorward/ui/hooks/useBaseRoutes';
import { DoorwardRoutes } from '../routes';

const useRoutes = (): UseBaseRoutes<DoorwardRoutes> => {
  const context = useContext(AppContext);
  return useBaseRoutes<DoorwardRoutes>(context);
};

export default useRoutes;
