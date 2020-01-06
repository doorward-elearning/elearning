import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../routes/routes';
import { fetchCurrentUserAction } from '../reducers/users/actions';
import { connectSocket } from '@edudoor/ui/utils/socket';
import useStateRef from '@edudoor/ui/hooks/useStateRef';
import Tools from '@edudoor/ui/utils/Tools';
import { AppContextProps } from '../main';
import useAction from '@edudoor/ui/hooks/useActions';
import useAuth from '@edudoor/ui/hooks/useAuth';
import { EdudoorRoutes } from '../routes';

export const appInitialValue = {
  routes: { ...ROUTES },
  setTitle: (key: keyof EdudoorRoutes, name: string, link?: string): void => {},
  setParams: (key: keyof EdudoorRoutes, params: { [name: string]: any }) => {},
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

  const setTitle = (key: keyof EdudoorRoutes, name: string, link?: string): void => {
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

  const setParams = (key: keyof EdudoorRoutes, params: { [name: string]: any }): void => {
    const current = previousRoutes.current[key];
    const newRoutes: typeof routes = { ...previousRoutes.current };
    (Object.keys(newRoutes) as Array<keyof typeof routes>).forEach(r => {
      if (newRoutes[r].tree.includes(current.id)) {
        newRoutes[r].link = Tools.createRoute(newRoutes[r].matchURL, params);
      }
    });
    const newLink = newRoutes[key];
    if (newLink.link !== current.link) {
      setRoutes(newRoutes);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (io) {
      Object.values([]).forEach(type => {
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