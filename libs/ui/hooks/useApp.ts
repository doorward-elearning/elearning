import _ from 'lodash';
import ROUTES from '@edudoor/frontend/src/routes/routes';
import { AppContextProps } from '@edudoor/frontend/src';
import * as eventTypes from '@edudoor/frontend/src/reducers/socket/types';
import { routes as Routes } from '@edudoor/frontend/src/routes';
import Tools from '@edudoor/frontend/src/utils/Tools';
import useStateRef from './useStateRef';
import useAuth from './useAuth';
import useAction from './useActions';
import { fetchCurrentUserAction } from '@edudoor/frontend/src/reducers/users/actions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectSocket } from '@edudoor/frontend/src/utils/socket';

export type RouteType = typeof Routes;

export const appInitialValue = {
  routes: { ...ROUTES },
  setTitle: (key: keyof RouteType, name: string, link?: string): void => {},
  setParams: (key: keyof RouteType, params: { [name: string]: any }) => {},
};

export interface UseApp extends AppContextProps {}

const useApp = (): UseApp => {
  const [routes, setRoutes, previousRoutes] = useStateRef(ROUTES);
  const [io, setIO] = useState();

  useEffect(() => {
    setIO(connectSocket());
  }, []);

  const auth = useAuth();
  const getCurrentUser = useAction(fetchCurrentUserAction);
  useEffect(() => {
    if (auth.authenticated) {
      getCurrentUser();
    }
  }, []);

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (io) {
      Object.values(eventTypes).forEach(type => {
        io.on((type: string, data: any) => {
          dispatch({
            type,
            payload: data,
          });
        });
      });
    }
  }, [io]);

  return {
    setTitle: _.throttle(setTitle, 100),
    setParams,
    routes,
    io,
    setIO,
  };
};

export default useApp;
