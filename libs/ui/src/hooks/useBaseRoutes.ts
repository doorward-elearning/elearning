import useApplicationRoutes, { UseApplicationRoutes } from '@doorward/ui/hooks/useApplicationRoutes';
import { RouteDefinition, RouteDefinitions, RouteNames } from '@doorward/ui/types';
import { AppContextProps } from '@doorward/ui/template/appContext';

export type UseBaseRoutes<T extends RouteNames> = UseApplicationRoutes<T> &
  AppContextProps<T> &
  RouteDefinitions<T> & {
    navigate: (route: RouteDefinition<T>, params?: { [name: string]: string | undefined }) => void;
    currentRoute?: keyof T;
    setCurrentTitle: (name: string) => void;
  };

function useBaseRoutes<T extends RouteNames>(context: AppContextProps<T>): UseBaseRoutes<T> {
  const data = useApplicationRoutes(context.routes);

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
}

export default useBaseRoutes;
