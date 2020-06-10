import { useContext } from 'react';
import { AppContext } from '../main';
import useBaseRoutes, { UseBaseRoutes } from '@edudoor/ui/hooks/useBaseRoutes';
import { EdudoorRoutes } from '../routes';

const useRoutes = (): UseBaseRoutes<EdudoorRoutes> => {
  const context = useContext(AppContext);
  return useBaseRoutes<EdudoorRoutes>(context);
};

export default useRoutes;
