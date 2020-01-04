import { SocketEvents } from '@edudoor/frontend/src/reducers/socket';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edudoor/frontend/src';

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
