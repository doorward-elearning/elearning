import { useEffect } from 'react';
import { WebComponentState } from '../reducers/reducers';
import { RouteNames, Routes } from '@edudoor/ui/types';

const useBreadCrumbTitle = <T, R extends RouteNames>(
  state: WebComponentState<T>,
  getTitle: (state: WebComponentState<T>) => string | null | undefined,
  routes: Routes<R>
) => {
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
