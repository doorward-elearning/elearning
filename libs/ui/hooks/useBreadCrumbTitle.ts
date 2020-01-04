import { useEffect } from 'react';
import { WebComponentState } from '@edudoor/frontend/src/reducers/reducers';
import useRoutes from './useRoutes';

const useBreadCrumbTitle = <T>(
  state: WebComponentState<T>,
  getTitle: (state: WebComponentState<T>) => string | null | undefined
) => {
  const routes = useRoutes();
  useEffect(() => {
    const title = getTitle(state);
    if (title) {
      if (routes.currentRoute) {
        routes.setTitle(routes.currentRoute, title);
      }
    }
  }, [state]);
};

export default useBreadCrumbTitle;
