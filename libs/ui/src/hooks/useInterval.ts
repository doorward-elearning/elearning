import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number, deps?: Array<any>) {
  const savedCallback = useRef(undefined);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, ...(deps || [])]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
