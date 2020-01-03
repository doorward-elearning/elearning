import { SocketEvents } from '../reducers/socket';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../index';

function useEventListener<T>(type: keyof SocketEvents, defaultData?: T) {
  const [data, setData] = useState(defaultData);
  const app = useContext(AppContext);

  useEffect(() => {
    if (app.io) {
      app.io.on(type, setData);
    }
  }, [app.io]);
  return data;
}
export default useEventListener;
