import _ from 'lodash';
import ROUTES from '../routes/routes';
import { AppContextProps } from '../index';
import { routes as Routes } from '../routes';
import Tools from '../utils/Tools';
import useStateRef from './useStateRef';

type RouteType = typeof Routes;
export const appInitialValue = {
  routes: { ...ROUTES },
  setTitle: (key: keyof RouteType, name: string, link?: string): void => {},
  setParams: (key: keyof RouteType, params: { [name: string]: any }) => {},
};

export interface UseApp extends AppContextProps {}

const useApp = (): UseApp => {
  const [routes, setRoutes, previousRoutes] = useStateRef(ROUTES);

  const setTitle = (key: keyof RouteType, name: string, link?: string): void => {
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

  const setParams = (key: keyof RouteType, params: { [name: string]: any }): void => {
    const current = previousRoutes.current[key];
    const newRoutes: typeof routes = { ...previousRoutes.current };
    (Object.keys(newRoutes) as Array<keyof typeof routes>).forEach(r => {
      if (newRoutes[r].tree.includes(current.id)) {
        newRoutes[r].link = Tools.createRoute(newRoutes[r].matchURL, params);
      }
    });
    const newLink = newRoutes[key];
    if (newLink.link != current.link) {
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
