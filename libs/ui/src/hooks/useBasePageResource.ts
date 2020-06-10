import { RouteNames } from '@edudoor/ui/types';
import { AppContextProps } from '@edudoor/ui/template/appContext';
import { ActionCreator } from '@edudoor/ui/reducers/reducers';
import { useRouteMatch } from 'react-router';
import useAction from '@edudoor/ui/hooks/useActions';
import { useEffect } from 'react';
import useBaseRoutes from '@edudoor/ui/hooks/useBaseRoutes';

const usePageResource = <T extends RouteNames>(
  context: AppContextProps<T>,
  key: string,
  action: ActionCreator,
  args: any[] = []
) => {
  const match: any = useRouteMatch();
  const dispatchAction = useAction(action);
  const routes = useBaseRoutes(context);

  const allArgs = [match.params[key], ...args];
  if (routes.currentRoute) {
    routes.setParams(routes.currentRoute, {
      ...match.params,
    });
  }

  useEffect(() => {
    dispatchAction(...allArgs);
  }, []);
};
const useBasePageResource = <T extends RouteNames>(context: AppContextProps<T>) => {
  return (key: string, action: ActionCreator, args: any[] = []) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePageResource(context, key, action, args);
  };
};

export default useBasePageResource;
