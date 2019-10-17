import { MouseEventHandler, useEffect } from 'react';

const useClickOutside = (listener: MouseEventHandler<any>, element: any): (() => void) => {
  const eventListener = (e: any) => {
    if (element.contains && e.target && element.contains(e.target)) {
      listener(e);
    }
  };
  useEffect(() => {
    document.addEventListener('click', eventListener);
  }, [element]);

  return () => {
    document.removeEventListener('click', eventListener);
  };
};

export default useClickOutside;
