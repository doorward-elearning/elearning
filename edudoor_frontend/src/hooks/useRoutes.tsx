import { AppContext, AppContextProps } from '../index';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { RouteDefinition } from '../types';

export interface UseRoutes extends AppContextProps {
  navigate: (route: RouteDefinition) => void;
}

const useRoutes = (): UseRoutes => {
  const context = useContext(AppContext);
  const history = useHistory();

  const navigate = (route: RouteDefinition) => {
    history.push(route.link);
  };
  return {
    ...context,
    navigate,
  };
};

export default useRoutes;
