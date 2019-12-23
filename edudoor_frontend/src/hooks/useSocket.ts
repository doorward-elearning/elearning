import { useContext } from 'react';
import { AppContext } from '../index';

const useSocket = () => {
  const app = useContext(AppContext);
};

export default useSocket;
