import { RouteNames } from '@doorward/ui/types';
import { AppContextProps } from '@doorward/ui/template/appContext';
import { ActionCreator } from '@doorward/ui/reducers/reducers';
import { useRouteMatch } from 'react-router';
import useAction from '@doorward/ui/hooks/useActions';
import { useEffect } from 'react';
import useBaseRoutes from '@doorward/ui/hooks/useBaseRoutes';

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
    const info = routes[routes.currentRoute];

    info.tree.forEach(key => {
      routes.setParams(key, {
        ...match.params,
      });
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
