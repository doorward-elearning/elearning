import { AppContext, AppContextProps } from '../index';
import { useContext } from 'react';

const useRoutes = (): AppContextProps => {
  return useContext(AppContext);
};

export default useRoutes;
