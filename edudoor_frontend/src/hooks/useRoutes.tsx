import { AppContext, AppContextProps } from '../index';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { RouteDefinition } from '../types';

export interface UseRoutes extends AppContextProps {
  navigate: (route: RouteDefinition, params?: { [name: string]: string }) => void;
}

const useRoutes = (): UseRoutes => {
  const context = useContext(AppContext);
  const history = useHistory();

  const navigate = (route: RouteDefinition, params = {}): void => {
    history.push(route.withParams(params));
  };
  return {
    ...context,
    navigate,
  };
};

export default useRoutes;
