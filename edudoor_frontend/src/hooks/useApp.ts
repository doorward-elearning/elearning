import { useEffect, useState } from 'react';
import ROUTES from '../routes/routes';
import { AppContextProps } from '../index';
import { routes as Routes } from '../routes';
import Tools from '../utils/Tools';

type RouteType = typeof Routes;
export const appInitialValue = {
  routes: { ...ROUTES },
  setTitle: (key: keyof RouteType, name: string, link?: string): void => {},
  setParams: (key: keyof RouteType, params: { [name: string]: any }) => {},
};

export interface UseApp extends AppContextProps {}

const useApp = (): UseApp => {
  const [routes, setRoutes] = useState(ROUTES);

  const setTitle = (key: keyof RouteType, name: string, link?: string): void => {
    const current = routes[key].name;
    link = link || routes[key].link;
    if (current !== name) {
      setRoutes({ ...routes, [key]: { ...routes[key], name, link } });
    }
  };

  const setParams = (key: keyof RouteType, params: { [name: string]: any }): void => {
    const current = routes[key];
    const newRoutes: typeof routes = { ...routes };
    (Object.keys(newRoutes) as Array<keyof typeof routes>).forEach(r => {
      if (newRoutes[r].tree.includes(current.id)) {
        newRoutes[r].link = Tools.createRoute(newRoutes[r].link, params);
      }
    });
    const newLink = newRoutes[key];
    if (newLink.link != current.link) {
      setRoutes(newRoutes);
    }
  };

  useEffect(() => {
    (Object.keys(routes) as Array<keyof typeof routes>).forEach(route => {
      routes[route].withParams = (params: { [name: string]: string }): string => {
        setParams(route, params);
        return routes[route].link;
      };
    });
  }, []);

  return {
    setTitle,
    setParams,
    routes,
  };
};

export default useApp;
