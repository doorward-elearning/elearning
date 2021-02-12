import { useEffect, useRef } from 'react';

const useKeyPress = (key: number, cb: (e: KeyboardEvent) => void, cntrl = false, element?: HTMLElement): void => {
  const callback: any = useRef();

  useEffect(() => {
    callback.current = cb;
  }, [cb]);

  const eventListener = (e: any): void => {
    let fire = e.which === key;
    fire = fire && (cntrl ? e.ctrlKey || e.metaKey : true);
    if (fire) {
      callback.current(e);
    }
  };

  useEffect(() => {
    const anchor = element || document;
    anchor.addEventListener('keydown', eventListener);

    return () => anchor.removeEventListener('keydown', eventListener);
  }, [key, element]);
};

export default useKeyPress;
