import { useContext } from 'react';
import { RouteDefinition, RouteDefinitions } from '@edudoor/ui/src/types';
import { AppContext, AppContextProps } from '../index';
import { EdudoorRoutes } from '../routes';
import useApplicationRoutes, { UseApplicationRoutes } from '@edudoor/ui/src/hooks/useApplicationRoutes';

export interface UseRoutes
  extends UseApplicationRoutes<EdudoorRoutes>,
    AppContextProps,
    RouteDefinitions<EdudoorRoutes> {
  navigate: (route: RouteDefinition<EdudoorRoutes>, params?: { [name: string]: string | undefined }) => void;
  currentRoute?: keyof EdudoorRoutes;
  setCurrentTitle: (name: string) => void;
}

const useRoutes = (): UseRoutes => {
  const context = useContext(AppContext);
  const data = useApplicationRoutes<EdudoorRoutes>(context.routes);

  return {
    ...context,
    ...context.routes,
    currentRoute: data.currentRoute,
    navigate: data.navigate,
    setCurrentTitle: (name: string) => {
      if (data.currentRoute) {
        context.setTitle(data.currentRoute, name);
      }
    },
  };
};

export default useRoutes;
