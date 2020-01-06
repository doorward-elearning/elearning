import { useContext } from 'react';
import { EdudoorRoutes } from '../routes';
import useApplicationRoutes, {
  UseApplicationRoutes
} from '@edudoor/ui/hooks/useApplicationRoutes';
import { AppContext, AppContextProps } from '../main';
import { RouteDefinition, RouteDefinitions } from '@edudoor/ui/types';

export interface UseRoutes
  extends UseApplicationRoutes<EdudoorRoutes>,
    AppContextProps,
    RouteDefinitions<EdudoorRoutes> {
  navigate: (
    route: RouteDefinition<EdudoorRoutes>,
    params?: { [name: string]: string | undefined }
  ) => void;
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
    }
  };
};

export default useRoutes;
