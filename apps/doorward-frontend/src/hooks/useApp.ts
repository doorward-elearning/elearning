import _ from 'lodash';
import { useEffect } from 'react';
import { ROUTES } from '../routes/routes';
import useStateRef from '@doorward/ui/hooks/useStateRef';
import Tools from '@doorward/common/utils/Tools';
import { DoorwardAppContextProps } from '../main';
import useAction from '@doorward/ui/hooks/useActions';
import useAuth from '@doorward/ui/hooks/useAuth';
import { DoorwardRoutes } from '../routes';
import DoorwardApi from '../services/apis/doorward.api';

export const appInitialValue = {
  routes: { ...ROUTES },
  setTitle: (key: keyof DoorwardRoutes, name: string, link?: string): void => {},
  setParams: (key: keyof DoorwardRoutes, params: { [name: string]: any }) => {},
};

export interface UseApp extends DoorwardAppContextProps {}

const useApp = (): UseApp => {
  const [routes, setRoutes, previousRoutes] = useStateRef(ROUTES);

  useEffect(() => {
    // setIO(connectSocket());
  }, []);

  const auth = useAuth();
  const getCurrentUser = useAction(DoorwardApi.auth.getCurrentUser);
  useEffect(() => {
    if (auth.authenticated) {
      getCurrentUser();
    }
  }, []);

  const setTitle = (key: keyof DoorwardRoutes, name: string, link?: string): void => {
    const newRoutes = { ...previousRoutes.current };
    const current = newRoutes[key].name;
    link = link || newRoutes[key].link;
    if (current !== name) {
      newRoutes[key] = {
        ...newRoutes[key],
        name,
        link,
      };
      setRoutes(newRoutes);
    }
  };

  const setParams = (key: keyof DoorwardRoutes, params: { [name: string]: any }): void => {
    const current = previousRoutes.current[key];
    const newRoutes: typeof routes = { ...previousRoutes.current };
    (Object.keys(newRoutes) as Array<keyof typeof routes>).forEach((r) => {
      if (newRoutes[r].tree.includes(current.id)) {
        newRoutes[r].link = Tools.createRoute(newRoutes[r].matchURL, params);
      }
    });
    const newLink = newRoutes[key];
    if (newLink.link !== current.link) {
      setRoutes(newRoutes);
    }
  };

  return {
    setTitle: _.throttle(setTitle, 100),
    setParams,
    routes,
  };
};

export default useApp;
