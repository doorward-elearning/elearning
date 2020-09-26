import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../main';

function useEventListener<T>(type: keyof any, defaultData?: T) {
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
