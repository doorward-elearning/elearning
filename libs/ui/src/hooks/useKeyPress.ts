import { useEffect, useRef } from 'react';

const useKeyPress = (key: number, cb: () => void, cntrl = false): void => {
  const callback: any = useRef();

  useEffect(() => {
    callback.current = cb;
  }, [callback]);


  const eventListener = (e: KeyboardEvent): void => {
    let fire = e.which === key;
    fire = fire && (cntrl ? e.ctrlKey || e.metaKey : true);
    if (fire) {
      callback.current();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', eventListener);
  }, [key]);
};

export default useKeyPress;
